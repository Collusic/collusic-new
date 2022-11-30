package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.track.TrackTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Getter
@NoArgsConstructor
public class ProjectCreateRequestDto {

    @NotBlank
    @Size(min = 1, max = 20, message = "프로젝트 명은 1자 이상 20자 이내로 한다.")
    private String projectName;

    @Min(value = 30, message = "BPM의 범위는 30부터 240까지 설정할 수 있다.")
    @Max(value = 240, message = "BPM의 범위는 30부터 240까지 설정할 수 있다.")
    private int bpm;

    @NotNull
    private TrackTag trackTag;

    @Builder
    public ProjectCreateRequestDto(String projectName, int bpm, String trackTag) {
        this.projectName = projectName;
        this.bpm = bpm;
        this.trackTag = TrackTag.valueOfLabel(trackTag);
    }
}