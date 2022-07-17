package com.collusic.collusicbe.web.auth.naver.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class NaverTokenResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Integer expiresIn;
    private String error;
    private String errorDescription;
}
