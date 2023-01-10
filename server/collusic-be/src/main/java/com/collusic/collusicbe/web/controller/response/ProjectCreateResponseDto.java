package com.collusic.collusicbe.web.controller.response;

import com.collusic.collusicbe.domain.project.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectCreateResponseDto {
    private Long id;

    public ProjectCreateResponseDto(Project project) {
        this.id = project.getId();
    }
}