package com.collusic.collusicbe.domain.field;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum Field {
    MELODY("멜로디"),
    INSTRUMENT("악기"),
    LYRICS("가사");

    private final String fieldValue;
}
