package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.web.controller.ProjectInventoryResponseDto;
import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TrackRepository trackRepository;

    public Project findById(UUID id) {
        return projectRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public Project createProject(Member member, ProjectCreateRequestDto requestDto) {
        Project project = Project.builder()
                                 .id(UUID.randomUUID())
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
                                                                                                       .trackTags(project.collectTrackTage())
                                                                                                       .likeCount(0) // TODO : 좋아요 기능 반영 시 수정할 것!
                                                                                                       .build())
                                                            .collect(Collectors.toList());

        ProjectsResponseDto responseDto = ProjectsResponseDto.builder()
                                                             .responseDtos(collect)
                                                             .number(projects.getNumber())
                                                             .hasNext(projects.hasNext())
                                                             .build();
        return responseDto;
    }
}
