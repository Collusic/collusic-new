package com.collusic.collusicbe.web.controller.response;

import com.collusic.collusicbe.domain.track.Track;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class TrackCreateResponseDto {

    private Long id;

    public TrackCreateResponseDto(Track track) {
        this.id = track.getId();
    }
}
