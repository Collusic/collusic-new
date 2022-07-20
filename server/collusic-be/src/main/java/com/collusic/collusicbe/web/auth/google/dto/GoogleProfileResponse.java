package com.collusic.collusicbe.web.auth.google.dto;

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
public class GoogleProfileResponse implements OAuth2Response {

    private String sub;
    private String picture;
    private String email;
    private String emailVerified;

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new HashMap<>();

        attributes.put("sub", sub);
        attributes.put("picture", picture);
        attributes.put("email", email);
        attributes.put("emailVerified", emailVerified);

        return attributes;
    }
}
