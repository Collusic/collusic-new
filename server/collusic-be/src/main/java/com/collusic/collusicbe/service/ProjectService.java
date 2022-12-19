package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.LikeRepository;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectLike;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.global.exception.ForbiddenException;
import com.collusic.collusicbe.web.controller.ProjectPreview;
import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final LikeRepository likeRepository;
    private final TrackService trackService;

    public Project findById(Long id) {
        return projectRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public Project createProject(Member member, ProjectCreateRequestDto requestDto, MultipartFile audioFile) throws IOException {
        Project project = Project.builder()
                                 .projectName(requestDto.getProjectName())
                                 .bpm(requestDto.getBpm())
                                 .fileUrl("empty")
                                 .build();

        Project save = projectRepository.save(project);
        Track track = trackService.create(member, project, new TrackCreateRequestDto(requestDto.getProjectName(), requestDto.getTrackTag().getLabel()), audioFile);
        save.addTrack(track);

        return projectRepository.save(save);
    }

    public ProjectsResponseDto getProjects(Pageable pageable, Member member) {
        Slice<Project> projects = projectRepository.findAllByOrderByModifiedDate(pageable);

        List<ProjectPreview> projectPreviews;

        if (member == null) {
            projectPreviews = makeProjectPreviews(projects.getContent(), member);
        } else {
            projectPreviews = makeProjectPreviews(projects.getContent(), member);
        }

        ProjectsResponseDto responseDto = ProjectsResponseDto.builder()
                                                             .responseDtos(projectPreviews)
                                                             .projectCount(projects.getNumberOfElements())
                                                             .hasNext(projects.hasNext())
                                                             .build();
        return responseDto;
    }

    @Transactional
    public LikeResponseDto likeProject(Long projectId, Member member) {
        Project project = projectRepository.findById(projectId)
                                           .orElseThrow(NoSuchElementException::new);

        Optional<ProjectLike> like = likeRepository.findLikesByProjectIdAndMemberId(projectId, member.getId());
        if (like.isPresent()) {
            project.deleteLike(like.get());
            likeRepository.delete(like.get());
            return new LikeResponseDto(likeRepository.countByProjectId(projectId).intValue(), likeRepository.existsByMemberAndProject(member, project));
        }

        ProjectLike projectLike = ProjectLike.builder()
                                             .member(member)
                                             .project(project)
                                             .build();

        likeRepository.save(projectLike);

        return new LikeResponseDto(likeRepository.countByProjectId(projectId).intValue(), likeRepository.existsByMemberAndProject(member, project));
    }

    @Transactional
    public void deleteProject(Long projectId, Member member) {
        Project project = projectRepository.findById(projectId)
                                           .orElseThrow(NoSuchElementException::new);
        project.checkDeletable(member);

        projectRepository.delete(project);
    }

    @Transactional
    public Project updateProject(Long projectId, Member member, ProjectUpdateRequestDto requestDto) {
        Project project = projectRepository.findById(projectId)
                                           .orElseThrow(NoSuchElementException::new);

        Track rootTrack = project.getTracks().get(0);

        if (rootTrack.isDeleted() || !rootTrack.hasSameCreator(member)) {
            throw new ForbiddenException("프로젝트 수정이 불가능합니다.");
        }

        project.update(requestDto.getProjectName(), requestDto.getTrackTag());

        return project;
    }

    private List<ProjectPreview> makeProjectPreviews(List<Project> projects, Member member) {
        List<ProjectPreview> projectPreviews = new ArrayList<>();

        for (Project project : projects) {
            List<TrackPreview> trackPreviews = project.getTracks().stream()
                                                      .map(track -> TrackPreview.builder()
                                                                                .trackId(track.getId())
                                                                                .trackTag(track.getTrackTag().getLabel())
                                                                                .fileUrl("fileUrl")
                                                                                .build())
                                                      .collect(Collectors.toList());

            projectPreviews.add(ProjectPreview.builder()
                                              .projectId(project.getId())
                                              .projectName(project.getProjectName())
                                              .trackPreviews(trackPreviews)
                                              .likeCount(likeRepository.countByProjectId(project.getId()).intValue())
                                              .isLiked(likeRepository.existsByMemberAndProject(member, project))
                                              .build());
        }

        return projectPreviews;
    }
}