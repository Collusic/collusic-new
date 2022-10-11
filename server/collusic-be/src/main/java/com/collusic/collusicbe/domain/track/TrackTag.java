package com.collusic.collusicbe.domain.track;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
@RequiredArgsConstructor
public enum TrackTag {
    PIANO("피아노"),
    DRUM("드럼"),
    VOCAL("보컬"),
    CLAP("박수"),
    ACOUSTIC_GUITAR("어쿠스틱 기타"),
    ELECTRIC_GUITAR("일렉 기타"),
    VIOLIN("바이올린"),
    RECORDER("리코더"),
    MARACAS("마라카스"),
    ETC("etc");

    private final String name;

    @JsonCreator
    public static TrackTag fromJson(@JsonProperty("key") String name) {
        return valueOf(name);
    }
}
