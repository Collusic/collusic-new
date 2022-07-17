package com.collusic.collusicbe.web.auth.google.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class GoogleTokenResponse {

    private String accessToken;
    private String idToken;
    private Integer expiresIn;
    private String tokenType;
    private String scope;
    private String refreshToken;

    @Builder
    public GoogleTokenResponse(String accessToken, String idToken, Integer expiresIn,
                               String tokenType, String scope, String refreshToken) {
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.expiresIn = expiresIn;
        this.tokenType = tokenType;
        this.scope = scope;
        this.refreshToken = refreshToken;
    }
}
