package com.collusic.collusicbe.domain.track;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum Measure {
    FOUR(4),
    EIGHT(8),
    SIXTEEN(16);

    @JsonValue
    private final int measure;

    private static final Map<Integer, Measure> integerToEnum =
            Stream.of(values()).collect(Collectors.toMap(x -> x.measure, x -> x));

    public static Measure valueOfInteger(Integer measure) {
        return integerToEnum.get(measure);
    }
}
