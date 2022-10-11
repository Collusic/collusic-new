package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.track.Measure;
import com.collusic.collusicbe.domain.track.TrackTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TrackCreateRequestDto {

    private String trackName;
    private TrackTag trackTag;
    private boolean editable;
    private Measure measure;
    private int volume;

    @Builder
    public TrackCreateRequestDto(String trackName, TrackTag trackTag, boolean editable, Measure measure, int volume) {
        this.trackName = trackName;
        this.trackTag = trackTag;
        this.editable = editable;
        this.measure = measure;
        this.volume = volume;
    }
}
