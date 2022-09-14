package com.collusic.collusicbe.web.auth.naver.dto;

import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class NaverTokenResponse implements OAuth2Response {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Integer expiresIn;
    private String error;
    private String errorDescription;

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new HashMap<>();

        attributes.put("token_type", tokenType);
        attributes.put("access_token", accessToken);
        attributes.put("expires_in", expiresIn);
        attributes.put("refresh_token", refreshToken);
        attributes.put("error", error);
        attributes.put("error_description", errorDescription);

        return attributes;
    }
}
