package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.project.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectUpdateResponseDto {
    private Long id;

    public ProjectUpdateResponseDto(Project project) {
        this.id = project.getId();
    }
}
