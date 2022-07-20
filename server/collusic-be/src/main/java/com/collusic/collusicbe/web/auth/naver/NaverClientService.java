package com.collusic.collusicbe.web.auth.naver;

import com.collusic.collusicbe.web.auth.OAuth2ClientService;
import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.collusic.collusicbe.web.auth.naver.dto.NaverTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class NaverClientService implements OAuth2ClientService {

    private static final String CONTENT_TYPE = MediaType.APPLICATION_JSON_VALUE;

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.naver.authorization-grant-type}")
    private String grantType;

    private final NaverAccessTokenClient naverAccessTokenClient;

    private final NaverProfileClient naverProfileClient;

    @Override
    public OAuth2Response requestLogin(Map<String, Object> authCode) {
        // TODO: Naver는 OIDC를 지원하지 않기 때문에 OAuth 플로우 처리를 위한 수정 필요
        NaverTokenResponse naverTokenResponse = naverAccessTokenClient.requestNaverToken(CONTENT_TYPE, GRANT_TYPE, clientId, clientSecret, (String) authCode.get("code"), (String) authCode.get("state"));
        return naverClient.requestNaverProfile("Bearer " + naverTokenResponse.getAccessToken());
    }
}
