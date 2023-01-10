package com.collusic.collusicbe.global.auth;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class JWTVerifyResult {

    private final boolean success;
    private final Map<String, Object> claims;
    private final String errorMessage;

    @Builder
    public JWTVerifyResult(boolean success, Map<String, Object> claims, String errorMessage) {
        this.success = success;
        this.claims = claims;
        this.errorMessage = errorMessage;
    }
}
