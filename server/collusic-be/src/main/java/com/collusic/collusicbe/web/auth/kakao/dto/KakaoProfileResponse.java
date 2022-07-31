package com.collusic.collusicbe.web.auth.kakao.dto;

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
public class KakaoProfileResponse implements OAuth2Response {

    private String sub;
    private String email;
    private String picture;
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        if (attributes != null) {
            return this.attributes;
        }

        this.attributes = new HashMap<>();
        this.attributes.put("sub", sub);
        this.attributes.put("email", email);
        this.attributes.put("picture", picture); // 기본값: 앱 연결 시의 카카오계정 썸네일 프로필 사진 URL, 110px*110px 크기

        return this.attributes;
    }
}