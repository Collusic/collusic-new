package com.collusic.collusicbe.domain.track;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    private static final Map<String, TrackTag> stringToEnum =
            Stream.of(values()).collect(Collectors.toMap(x -> x.label, x -> x));

    @JsonValue
    private final String label;

    public static TrackTag valueOfLabel(String label) {
        return stringToEnum.get(label);
    }
}
