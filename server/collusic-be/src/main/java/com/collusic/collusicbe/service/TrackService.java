package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.global.exception.CannotDeleteException;
import com.collusic.collusicbe.global.exception.CannotUpdateException;
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

        Track savedTrack = trackRepository.save(track);

        project.updateModifiedDate(savedTrack.getCreatedDate());

        projectRepository.save(project);

        return savedTrack;
    }

    public Track update(Member member, long trackId, TrackUpdateRequestDto trackData) {
        Track track = trackRepository.findById(trackId)
                                     .orElseThrow(NoSuchElementException::new);

        if (track.isDeleted()) {
            throw new CannotUpdateException("이미 삭제한 트랙입니다.");
        }

        if (!track.hasSameCreator(member)) {
            throw new CannotUpdateException("타인이 생성한 트랙인 경우, 트랙을 수정할 수 없습니다.");
        }

        track.changeTrackInfo(trackData.getTrackName(), trackData.getTrackTag());

        return trackRepository.save(track);
    }

    public void delete(Member member, Project project, long id) {
        Track track = project.getTrack(id);

        if (track.isDeleted()) {
            throw new CannotDeleteException("이미 삭제한 트랙입니다.");
        }

        if (!track.hasSameCreator(member)) {
            throw new ForbiddenException("타인이 생성한 트랙인 경우, 트랙을 삭제할 수 없습니다.");
        }

        if (project.getTracks().size() == 1) {
            projectRepository.delete(project);
            return;
        }

        track.delete();
        trackRepository.save(track);
    }
}
