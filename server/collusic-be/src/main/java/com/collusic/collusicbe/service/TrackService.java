package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.global.exception.ForbiddenException;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.TrackUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final ProjectRepository projectRepository;
    private final TrackRepository trackRepository;

    public Track create(Member member, Project project, TrackCreateRequestDto trackData) {
        if (project.isTrackFull()) {
            throw new IllegalStateException();
        }
        Track track = Track.builder()
                           .creator(member)
                           .project(project)
                           .trackName(trackData.getTrackName())
                           .trackTag(trackData.getTrackTag())
                           .orderInProject(project.getNextTrackOrder())
                           .build();
        return trackRepository.save(track);
    }

    public Track update(Member member, long trackId, TrackUpdateRequestDto trackData) {
        Track track = trackRepository.findById(trackId)
                                     .orElseThrow(NoSuchElementException::new);

        if (!member.isSameMember(track.getCreator())) {
            throw new IllegalArgumentException();
        }

        track.changeTrackInfo(trackData.getTrackName(), trackData.getTrackTag());

        return trackRepository.save(track);
    }

    public void delete(Member member, Project project, long id) {
        Track track = project.getTrack(id);

        if (!member.isSameMember(track.getCreator())) {
            throw new ForbiddenException();
        }

        if (project.getTracks().size() == 1) {
            projectRepository.delete(project);
            return;
        }

        project.removeTrack(track.getId());
        trackRepository.delete(track);
    }
}
