package com.collusic.collusicbe.config.auth.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OAuthInfoResponseDto {

    private final String authId;
    private final String email;
}
