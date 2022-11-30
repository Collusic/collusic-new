package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.project.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class ProjectCreateResponseDto {
    private UUID id;

    public ProjectCreateResponseDto(Project project) {
        this.id = project.getId();
    }
}