package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.track.Measure;
import com.collusic.collusicbe.domain.track.TrackTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
public class TrackCreateRequestDto {

    @NotBlank
    @Size(min = 1, max = 20, message = "트랙 명은 1자 이상 20자 이내로 한다.")
    private String trackName;
    @NotNull
    private TrackTag trackTag;
    @NotNull
    private Boolean editable;
    @NotNull
    private Measure measure;
    @NotNull
    @Min(0)
    @Max(100)
    private Integer volume;

    @Builder
    public TrackCreateRequestDto(String trackName, String trackTag, Boolean editable, Integer measure, Integer volume) {
        this.trackName = trackName;
        this.trackTag = TrackTag.valueOfLabel(trackTag);
        this.editable = editable;
        this.measure = Measure.valueOfInteger(measure);
        this.volume = volume;
    }
}
