package com.collusic.collusicbe.web.controller.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NicknameValidationResponseDto {

    private int status;
    private String message;

    @Builder
    public NicknameValidationResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }
}