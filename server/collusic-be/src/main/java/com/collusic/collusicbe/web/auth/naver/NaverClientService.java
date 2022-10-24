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

    @Value("${oauth2.client.naver.client-id}")
    private String clientId;

    @Value("${oauth2.client.naver.client-secret}")
    private String clientSecret;

    @Value("${oauth2.client.naver.authorization-grant-type}")
    private String grantType;

    private final NaverAccessTokenClient naverAccessTokenClient;

    private final NaverProfileClient naverProfileClient;

    @Override
    public OAuth2Response requestLogin(Map<String, String> authCode) {
        NaverTokenResponse naverTokenResponse = naverAccessTokenClient.requestNaverToken(CONTENT_TYPE, grantType, clientId, clientSecret, (String) authCode.get("code"), (String) authCode.get("state"));
        return naverProfileClient.requestNaverProfile("Bearer " + naverTokenResponse.getAccessToken());
    }
}
