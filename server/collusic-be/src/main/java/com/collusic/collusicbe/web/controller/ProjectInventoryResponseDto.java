package com.collusic.collusicbe.web.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectInventoryResponseDto {
    private Long projectId;
    private String projectName;
    private List<String> trackTags;
    private int likeCount;
    private boolean isLiked;

    @Builder
    public ProjectInventoryResponseDto(Long projectId, String projectName, List<String> trackTags, int likeCount, boolean isLiked) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.trackTags = trackTags;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
