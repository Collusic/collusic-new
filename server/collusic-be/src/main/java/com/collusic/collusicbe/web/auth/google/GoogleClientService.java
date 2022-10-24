package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.web.auth.OAuth2ClientService;
import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.collusic.collusicbe.web.auth.google.dto.GoogleTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class GoogleClientService implements OAuth2ClientService {

    private static final String CONTENT_TYPE = MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=utf-8";

    @Value("${oauth2.client.google.client-id}")
    private String clientId;

    @Value("${oauth2.client.google.client-secret}")
    private String clientSecret;

    @Value("${oauth2.client.google.redirect-uri}")
    private String redirectUri;

    @Value("${oauth2.client.google.authorization-grant-type}")
    private String grantType;

    private final GoogleProfileClient googleProfileClient;

    private final GoogleAccessTokenClient googleAccessTokenClient;

    @Override
    public OAuth2Response requestLogin(Map<String, String> authCode) {
        GoogleTokenResponse googleTokenResponse = googleAccessTokenClient.requestGoogleAccessToken(CONTENT_TYPE, grantType, clientId, redirectUri, (String) authCode.get("code"), clientSecret);
        return googleProfileClient.requestGoogleProfile("Bearer " + googleTokenResponse.getAccessToken());
    }
}