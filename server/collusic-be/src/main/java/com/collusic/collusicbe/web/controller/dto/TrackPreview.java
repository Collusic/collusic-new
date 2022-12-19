package com.collusic.collusicbe.web.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TrackPreview {
    private Long trackId;
    private String trackTag;
    private String fileUrl;

    @Builder
    public TrackPreview(Long trackId, String trackTag, String fileUrl) {
        this.trackId = trackId;
        this.trackTag = trackTag;
        this.fileUrl = fileUrl;
    }
}
