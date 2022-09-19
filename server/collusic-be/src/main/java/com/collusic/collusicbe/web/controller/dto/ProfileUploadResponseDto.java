package com.collusic.collusicbe.web.controller.dto;

import lombok.Getter;

@Getter
public class ProfileUploadResponseDto {

    private final String originalProfileUrl;
    private final String resizedProfileUrl;

    public ProfileUploadResponseDto(String originalProfileUrl, String resizedProfileUrl) {
        this.originalProfileUrl = originalProfileUrl;
        this.resizedProfileUrl = resizedProfileUrl;
    }
}
