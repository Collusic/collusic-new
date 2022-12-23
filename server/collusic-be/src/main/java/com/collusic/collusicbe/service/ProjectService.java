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
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public ProjectResponseDto getProject(Long id, Member member) {
        Project project = projectRepository.findById(id)
                                           .orElseThrow(NoSuchElementException::new);

        List<TrackResponseDto> tracks = project.getTracks().stream()
                                               .map(track -> TrackResponseDto.builder()
                                                                             .member(track.getCreator())
                                                                             .track(track)
                                                                             .build())
                                               .collect(Collectors.toList());

        ProjectResponseDto projectResponseDto = ProjectResponseDto.builder()
                                                     .projectId(project.getId())
                                                     .projectName(project.getProjectName())
                                                     .bpm(project.getBpm())
                                                     .tracks(tracks)
                                                     .likeCount(likeRepository.countByProjectId(project.getId()).intValue())
                                                     .isLiked(likeRepository.existsByMemberAndProject(member, project))
                                                     .build();

        return projectResponseDto;
    }

    @Transactional
    public Project createProject(Member member, ProjectCreateRequestDto requestDto) throws IOException {
        Project project = Project.builder()
                                 .projectName(requestDto.getProjectName())
                                 .bpm(requestDto.getBpm())
                                 .fileUrl("empty")
                                 .build();

        Project save = projectRepository.save(project);
        Track track = trackService.create(member, project, new TrackCreateRequestDto(requestDto.getProjectName(), requestDto.getTrackTag().getLabel(), requestDto.getAudioFile()));
        save.addTrack(track);

        return projectRepository.save(save);
    }

    @Transactional(readOnly = true)
    public ProjectsResponseDto getProjects(int size, Long cursorId, Member member) {
        List<Project> projects;

        if (cursorId == null) {
            projects = projectRepository.findAllByOrderByModifiedDateFirstPage(size + 1);
        } else {
            Project cursorProject = projectRepository.findById(cursorId)
                                                     .orElseThrow(NoSuchElementException::new);
            projects = projectRepository.findAllByOrderByModifiedDate(size + 1, cursorId, cursorProject.getModifiedDate());
        }

        List<ProjectPreview> projectPreviews = makeProjectPreviews(projects, member, size);

        boolean hasNext = projects.size() > size;

        ProjectsResponseDto responseDto = ProjectsResponseDto.builder()
                                                             .responseDtos(projectPreviews)
                                                             .projectCount(projectPreviews.size())
                                                             .hasNext(hasNext)
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

    private List<ProjectPreview> makeProjectPreviews(List<Project> projects, Member member, int size) {
        List<ProjectPreview> projectPreviews = new ArrayList<>();

        for (Project project : projects) {

            if (projectPreviews.size() == size) {
                continue;
            }

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