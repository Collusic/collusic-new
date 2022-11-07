package com.collusic.collusicbe.web.controller.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ReissuedTokenDto {
    private final String token;
}