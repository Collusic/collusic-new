package com.collusic.collusicbe.web.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NicknameValidationResponseDto {

    private boolean isDuplicated;
    private String message;

    @Builder
    public NicknameValidationResponseDto(boolean isDuplicated, String message) {
        this.isDuplicated = isDuplicated;
        this.message = message;
    }
}