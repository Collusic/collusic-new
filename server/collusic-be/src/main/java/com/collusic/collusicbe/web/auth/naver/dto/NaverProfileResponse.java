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

    private String resultcode;
    private String message;
    private Map<String, Object> response;

    @Override
    public Map<String, Object> getAttributes() {
        this.response.put("sub", this.response.get("id"));
        this.response.remove("id");
        return this.response;
    }
}
