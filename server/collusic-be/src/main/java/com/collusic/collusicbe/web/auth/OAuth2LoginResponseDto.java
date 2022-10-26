package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.SnsType;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class OAuth2LoginResponseDto {

    private final OAuth2LoginResponseType responseType;
    private final Map<String, Object> attributes;

    @Builder
    public OAuth2LoginResponseDto(OAuth2LoginResponseType responseType, SnsType snsType,
                                  String message, String accessToken, String refreshToken, String email, String authId, String profileImageUrl) {
        this.responseType = responseType;

        attributes = new HashMap<>();
        if (snsType != null) {
            attributes.put("snsType", snsType);
        }
        if (message != null) {
            attributes.put("message", message);
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
        if (authId != null) {
            attributes.put("authId", authId);
        }
        if (profileImageUrl != null) {
            attributes.put("profileImageUrl", profileImageUrl);
        }
    }
}
