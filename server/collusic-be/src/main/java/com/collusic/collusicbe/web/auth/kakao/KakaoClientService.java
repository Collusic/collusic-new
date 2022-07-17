package com.collusic.collusicbe.web.auth.kakao;

import com.collusic.collusicbe.web.auth.OAuth2ClientService;
import com.collusic.collusicbe.web.auth.OAuth2Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class KakaoClientService implements OAuth2ClientService {

    private final KakaoClient kakaoClient;

    private static final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";

    private static final String GRANT_TYPE = "authorization_code";

    private static final String REDIRECT_URI = "http://localhost:8080/oauth2/login/kakao";

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String clientSecret;

    @Override
    public OAuth2Response requestLogin(Map<String, Object> authCode) {
        return kakaoClient.requestKakaoToken(CONTENT_TYPE, GRANT_TYPE, clientId, REDIRECT_URI, (String) authCode.get("code"), clientSecret);
    }
}
