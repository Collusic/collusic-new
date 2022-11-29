package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.track.TrackTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectCreateRequestDto {
    private String projectName;
    private int bpm;
    private TrackTag trackTag;

    @Builder
    public ProjectCreateRequestDto(String projectName, int bpm, String trackTag) {
        this.projectName = projectName;
        this.bpm = bpm;
        this.trackTag = TrackTag.valueOfLabel(trackTag);
    }
}