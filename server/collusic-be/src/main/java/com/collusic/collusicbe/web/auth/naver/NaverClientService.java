package com.collusic.collusicbe.web.auth.naver;

import com.collusic.collusicbe.web.auth.OAuth2ClientService;
import com.collusic.collusicbe.web.auth.OAuth2Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class NaverClientService implements OAuth2ClientService {

    private final NaverClient naverClient;

    private static final String CONTENT_TYPE = "application/json";

    private static final String GRANT_TYPE = "authorization_code"; // 발급 - 'authorization_code', 갱신 - 'refresh_token', 삭제 - 'delete'

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String clientSecret;

    @Override
    public OAuth2Response requestLogin(Map<String, Object> authCode) {
        // TODO: Naver는 OIDC를 지원하지 않기 때문에 OAuth 플로우 처리를 위한 수정 필요
        return naverClient.requestNaverToken(CONTENT_TYPE, GRANT_TYPE, clientId, clientSecret, (String) authCode.get("code"), (String) authCode.get("state"));
    }
}
