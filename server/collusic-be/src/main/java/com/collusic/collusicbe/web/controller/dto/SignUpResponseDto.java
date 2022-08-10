package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.web.auth.OAuth2LoginResponseType;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class SignUpResponseDto {

    private final OAuth2LoginResponseType responseType;
    private final Map<String, Object> attributes;

    @Builder
    public SignUpResponseDto(OAuth2LoginResponseType responseType, String message,
                             String accessToken, String refreshToken, String email) {
        this.responseType = responseType;

        attributes = new HashMap<>();
        if (message != null) {
            attributes.put("errorMessage", message);
        }
        if (accessToken != null) {
            attributes.put("accessToken", accessToken);
        }
        if (refreshToken != null) {
            attributes.put("refreshToken", refreshToken);
        }
        if (email != null) {
            attributes.put("email", email);
        }
    }
}