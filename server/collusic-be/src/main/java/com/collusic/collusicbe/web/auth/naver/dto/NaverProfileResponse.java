package com.collusic.collusicbe.web.auth.naver.dto;

import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class NaverProfileResponse implements OAuth2Response {

    private String resultCode;
    private String message;
    private Map<String, Object> response;

    @Override
    public Map<String, Object> getAttributes() {
        return response;
    }
}
