package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.config.auth.LoginMember;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.service.TrackService;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.TrackCreateResponseDto;
import com.collusic.collusicbe.web.controller.dto.TrackUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class TrackController {

    private final TrackService trackService;
    private final ProjectService projectService;

    @PostMapping("/projects/{projectId}/tracks")
    public ResponseEntity<TrackCreateResponseDto> createTrack(@LoginMember Member member, @PathVariable Long projectId, @Validated @RequestBody final TrackCreateRequestDto requestDto) {
        Project project = projectService.findById(projectId);
        Track track = trackService.create(member, project, requestDto);

        return ResponseEntity.created(URI.create("/projects/" + projectId + "/tracks/" + track.getId())).body(new TrackCreateResponseDto(track));
    }

    @PutMapping("/tracks/{trackId}")
    public ResponseEntity<Void> updateTrack(@LoginMember Member member, @PathVariable Long trackId, @Validated @RequestBody final TrackUpdateRequestDto requestDto) {
        Project project = projectService.findById(requestDto.getProjectId());

        if (!project.isLastTrackId(trackId)) {
            throw new IllegalArgumentException();
        }

        trackService.update(member,trackId,requestDto);

        return ResponseEntity.ok(null);
}
}
