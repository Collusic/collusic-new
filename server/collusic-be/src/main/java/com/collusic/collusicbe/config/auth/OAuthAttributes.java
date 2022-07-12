package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.domain.member.SnsType;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private String snsType;
    private String userNameAttributeName;
    private String email;
    private String authId;
    private Map<String, Object> attributes;

    @Builder
    public OAuthAttributes(String snsType, String userNameAttributeName, String email, String authId, Map<String, Object> attributes) {
        this.snsType = snsType;
        this.userNameAttributeName = userNameAttributeName;
        this.email = email;
        this.authId = authId;
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
                              .snsType(SnsType.GOOGLE.name())
                              .email((String) attributes.get("email"))
                              .authId((String) attributes.get("sub"))
                              .attributes(attributes)
                              .userNameAttributeName(userNameAttributeName)
                              .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                              .snsType(SnsType.NAVER.name())
                              .email((String) response.get("email"))
                              .authId((String) response.get("id"))
                              .attributes(response)
                              .userNameAttributeName(userNameAttributeName)
                              .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
        response.put(userNameAttributeName, attributes.get(userNameAttributeName));

        return OAuthAttributes.builder()
                              .snsType(SnsType.KAKAO.name())
                              .email((String) response.get("email"))
                              .authId((String) attributes.get("id"))
                              .attributes(response)
                              .userNameAttributeName(userNameAttributeName)
                              .build();
    }
}