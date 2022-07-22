package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.member.SnsType;
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
    public SignUpResponseDto(OAuth2LoginResponseType responseType, SnsType snsType,
                                  String message, String accessToken, String refreshToken, String email, String authId) {
        this.responseType = responseType;

        attributes = new HashMap<>();
        attributes.put("sns_type", snsType);
        if (message != null) {
            attributes.put("error_message", message);
        }
        if (accessToken != null) {
            attributes.put("access_token", accessToken);
        }
        if (refreshToken != null) {
            attributes.put("refresh_token", refreshToken);
        }
        if (email != null) {
            attributes.put("email", email);
        }
        if (authId != null) {
            attributes.put("authId", authId);
        }
    }
}