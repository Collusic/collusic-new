package com.collusic.collusicbe.web.controller.dto;

import lombok.Getter;

@Getter
public class ProjectCreateResponseDto {
    private Long id;

    public ProjectCreateResponseDto(Long id) {
        this.id = id;
    }
}