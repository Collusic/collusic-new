package com.collusic.collusicbe.domain.track;

public enum Measure {
    FOUR(4),
    EIGHT(8),
    SIXTEEN(16);

    private int measure;

    Measure(int measure) {
        this.measure = measure;
    }
}
