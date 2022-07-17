package com.collusic.collusicbe.web.auth.google.dto;

import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleTokenResponse implements OAuth2Response {

    private String accessToken;
    private String idToken;
    private Integer expiresIn;
    private String tokenType;
    private String scope;
    private String refreshToken;
}
