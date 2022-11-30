package com.collusic.collusicbe.web.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectInventoryResponseDto {
    private String projectName;
    private List<String> trackTags;
    private int likeCount;

    @Builder
    public ProjectInventoryResponseDto(String projectName, List<String> trackTags, int likeCount) {
        this.projectName = projectName;
        this.trackTags = trackTags;
        this.likeCount = likeCount;
    }
}
