package com.collusic.collusicbe.web.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NicknameValidationResponseDto {

    private String result;
    private String message;

    @Builder
    public NicknameValidationResponseDto(String result, String message) {
        this.result = result;
        this.message = message;
    }
}