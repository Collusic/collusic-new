package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.TrackUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TrackService {

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
                           .measure(trackData.getMeasure())
                           .volume(trackData.getVolume())
                           .orderInProject(project.getNextTrackOrder())
                           .build();
        return trackRepository.save(track);
    }

    public Track update(Member member, long trackId, TrackUpdateRequestDto trackData) {
        Track track = trackRepository.findById(trackId)
                                     .orElseThrow(NoSuchElementException::new);

        if (!member.isSameMember(track.getCreator().getNickname())) {
            throw new IllegalArgumentException();
        }

        track.changeTrackInfo(
                trackData.getTrackName(),
                trackData.getTrackTag(),
                trackData.getEditable(),
                trackData.getMeasure(),
                trackData.getVolume());

        return trackRepository.save(track);
    }
}
