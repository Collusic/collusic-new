package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackRepository trackRepository;

    public Track create(Member member, Project project, TrackCreateRequestDto trackData) {
        if (project.isTrackFull()) {
            throw new RuntimeException();
        }
        Track track = Track.builder()
                           .creator(member)
                           .project(project)
                           .trackName(trackData.getTrackName())
                           .trackTag(trackData.getTrackTag())
                           .measure(trackData.getMeasure())
                           .volume(trackData.getVolume())
                           .order(project.getNextTrackOrder())
                           .build();
        return trackRepository.save(track);
    }
}
