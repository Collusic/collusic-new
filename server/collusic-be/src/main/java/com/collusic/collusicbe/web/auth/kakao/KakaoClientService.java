package com.collusic.collusicbe.web.auth.kakao;

import com.collusic.collusicbe.web.auth.OAuth2ClientService;
import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.collusic.collusicbe.web.auth.kakao.dto.KakaoTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class KakaoClientService implements OAuth2ClientService {

    private static final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";

    private final KakaoAccessTokenClient kakaoAccessTokenClient;

    private final KakaoProfileClient kakaoProfileClient;

    @Value("${oauth2.client.kakao.client-id}")
    private String clientId;

    @Value("${oauth2.client.kakao.client-secret}")
    private String clientSecret;

    @Value("${oauth2.client.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${oauth2.client.kakao.authorization-grant-type}")
    private String grantType;

    @Override
    public OAuth2Response requestLogin(Map<String, Object> authCode) {
        KakaoTokenResponse kakaoTokenResponse = kakaoAccessTokenClient.requestKakaoToken(CONTENT_TYPE, grantType, clientId, redirectUri, (String) authCode.get("code"), clientSecret);
        return kakaoProfileClient.requestKakaoProfile(CONTENT_TYPE, "Bearer " + kakaoTokenResponse.getAccessToken());
    }
}
