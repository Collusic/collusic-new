package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.LikeRepository;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectLike;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.web.controller.ProjectInventoryResponseDto;
import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.LikeResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TrackRepository trackRepository;
    private final LikeRepository likeRepository;

    public Project findById(Long id) {
        return projectRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public Project createProject(Member member, ProjectCreateRequestDto requestDto) {
        Project project = Project.builder()
                                 .projectName(requestDto.getProjectName())
                                 .bpm(requestDto.getBpm())
                                 .fileUrl("empty")
                                 .build();

        Project save = projectRepository.save(project);

        Track track = Track.builder()
                           .trackName(project.getProjectName())
                           .trackTag(requestDto.getTrackTag())
                           .creator(member)
                           .project(project)
                           .orderInProject(project.getNextTrackOrder())
                           .build();

        project.addTrack(track);

        trackRepository.save(track);

        return save;
    }

    public ProjectsResponseDto getProjects(Pageable pageable) {
        Slice<Project> projects = projectRepository.findAllByOrderByCreatedDate(pageable);

        List<ProjectInventoryResponseDto> collect = projects.getContent().stream()
                                                            .map(project -> ProjectInventoryResponseDto.builder()
                                                                                                       .projectName(project.getProjectName())
                                                                                                       .trackTags(project.collectTrackTags())
                                                                                                       .likeCount(project.getLikes().size()) // TODO : 좋아요 기능 반영 시 수정할 것!
                                                                                                       .build())
                                                            .collect(Collectors.toList());

        ProjectsResponseDto responseDto = ProjectsResponseDto.builder()
                                                             .responseDtos(collect)
                                                             .number(projects.getNumber())
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
            return new LikeResponseDto(likeRepository.countByProjectIdAndMemberId(projectId, member.getId()).intValue(), false);
        }

        ProjectLike projectLike = ProjectLike.builder()
                                             .member(member)
                                             .project(project)
                                             .build();

        likeRepository.save(projectLike);

        return new LikeResponseDto(likeRepository.countByProjectIdAndMemberId(projectId, member.getId()).intValue(), true);
    }
}