package com.collusic.collusicbe.web.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectsResponseDto {
    private List<ProjectPreview> responseDtos;
    private int projectCount;
    private boolean hasNext;

    @Builder
    public ProjectsResponseDto(List<ProjectPreview> responseDtos, int projectCount, boolean hasNext) {
        this.responseDtos = responseDtos;
        this.projectCount = projectCount;
        this.hasNext = hasNext;
    }
}
