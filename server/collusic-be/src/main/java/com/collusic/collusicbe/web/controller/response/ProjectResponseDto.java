package com.collusic.collusicbe.web.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectResponseDto {
    private Long projectId;
    private String projectName;
    private int bpm;
    private List<TrackResponseDto> tracks;
    private int likeCount;
    private Boolean isLiked;

    @Builder
    public ProjectResponseDto(Long projectId, String projectName, int bpm, List<TrackResponseDto> tracks, int likeCount, Boolean isLiked) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.bpm = bpm;
        this.tracks = tracks;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
