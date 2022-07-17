package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.web.auth.OAuth2ClientService;
import com.collusic.collusicbe.web.auth.OAuth2Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class GoogleClientService implements OAuth2ClientService {

    private final GoogleClient googleClient;

    private static final String GOOGLE_CONTENT_TYPE = "application/x-www-form-urlencoded";

    private static final String GOOGLE_GRANT_TYPE = "authorization_code";

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Override
    public OAuth2Response requestLogin(Map<String, Object> authCode) {
        return googleClient.requestGoogleAccessToken(GOOGLE_CONTENT_TYPE, (String) authCode.get("code"), GOOGLE_GRANT_TYPE, clientId, clientSecret);
    }
}
