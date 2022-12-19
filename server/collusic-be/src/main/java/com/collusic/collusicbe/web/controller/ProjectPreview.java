package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.web.controller.dto.TrackPreview;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectPreview {
    private Long projectId;
    private String projectName;
    private List<TrackPreview> trackPreviews;
    private int likeCount;
    private Boolean isLiked;

    @Builder
    public ProjectPreview(Long projectId, String projectName, List<TrackPreview> trackPreviews, int likeCount, Boolean isLiked) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.trackPreviews = trackPreviews;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
