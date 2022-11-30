package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.UUID;

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
}
