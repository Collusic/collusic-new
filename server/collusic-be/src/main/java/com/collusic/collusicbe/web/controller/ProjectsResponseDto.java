package com.collusic.collusicbe.web.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectsResponseDto {
    private List<ProjectInventoryResponseDto> responseDtos;
    private int number;
    private boolean hasNext;

    @Builder
    public ProjectsResponseDto(List<ProjectInventoryResponseDto> responseDtos, int number, boolean hasNext) {
        this.responseDtos = responseDtos;
        this.number = number;
        this.hasNext = hasNext;
    }
}
