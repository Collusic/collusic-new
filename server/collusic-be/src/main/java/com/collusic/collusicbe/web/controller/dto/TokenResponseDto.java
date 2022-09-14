package com.collusic.collusicbe.web.controller.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenResponseDto {

    private final String accessToken;
    private final String refreshToken;
}