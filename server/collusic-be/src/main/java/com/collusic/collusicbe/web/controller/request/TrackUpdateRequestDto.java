package com.collusic.collusicbe.web.controller.request;

import com.collusic.collusicbe.domain.track.TrackTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class TrackUpdateRequestDto {

    @NotBlank
    @Size(min = 1, max = 20, message = "트랙 명은 1자 이상 20자 이내로 한다.")
    private String trackName;
    @NotNull
    private TrackTag trackTag;

    @Builder
    public TrackUpdateRequestDto(String trackName, String trackTag) {
        this.trackName = trackName;
        this.trackTag = TrackTag.valueOfLabel(trackTag);
    }
}
