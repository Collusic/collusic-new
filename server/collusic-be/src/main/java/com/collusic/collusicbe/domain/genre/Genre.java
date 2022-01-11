package com.collusic.collusicbe.domain.genre;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Genre {
    ACOUSTIC("어쿠스틱"),
    BLUES("블루스"),
    CLASSIC("클래식"),
    COUNTRY("컨트리"),
    ELECTRONIC("일렉트로닉"),
    FOLK("포크"),
    PUNK("펑크"),
    HIP_HOP("힙합"),
    INDIE("인디"),
    JAZZ("재즈"),
    LATIN("라틴"),
    POP("팝"),
    REGGAE("레게"),
    RETRO("레트로"),
    ROCK("락"),
    SOUL_R_B("소울&알앤비");

    private final String genreValue;
}
