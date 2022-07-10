package com.collusic.collusicbe.config.auth;

import lombok.Builder;

import java.util.Map;

public class OAuthAttributes {
    private String snsType;
    private String userNameAttributeName;
    private String email;
    private Map<String, Object> attributes;

    @Builder
    public OAuthAttributes(String snsType, String userNameAttributeName, String email, Map<String, Object> attributes) {
        this.snsType = snsType;
        this.userNameAttributeName = userNameAttributeName;
        this.email = email;
        this.attributes = attributes;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("naver".equals(registrationId)) {
            return ofNaver(userNameAttributeName, attributes);
        } else if ("kakao".equals(registrationId)) {
            return ofKakao(userNameAttributeName, attributes);
        }

        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                              .snsType("GOOGLE")
                              .email((String) attributes.get("email"))
                              .attributes(attributes)
                              .userNameAttributeName(userNameAttributeName)
                              .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                              .snsType("NAVER")
                              .email((String) response.get("email"))
                              .attributes(response)
                              .userNameAttributeName(userNameAttributeName)
                              .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
        response.put(userNameAttributeName, attributes.get(userNameAttributeName));

        return OAuthAttributes.builder()
                              .snsType("KAKAO")
                              .email((String) response.get("email"))
                              .attributes(response)
                              .userNameAttributeName(userNameAttributeName)
                              .build();
    }
}