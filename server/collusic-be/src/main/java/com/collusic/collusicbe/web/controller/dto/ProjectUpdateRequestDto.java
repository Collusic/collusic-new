package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.track.TrackTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Getter
@NoArgsConstructor
public class ProjectUpdateRequestDto {

    @NotBlank
    @Size(min = 1, max = 20, message = "프로젝트 명은 1자 이상 20자 이내로 한다.")
    private String projectName;

    @NotNull
    private TrackTag trackTag;

    @Builder
    public ProjectUpdateRequestDto(String projectName, String trackTag) {
        this.projectName = projectName;
        this.trackTag = TrackTag.valueOfLabel(trackTag);
    }
}