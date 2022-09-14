package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.web.auth.OAuth2ClientService;
import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.collusic.collusicbe.web.auth.google.dto.GoogleTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

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
    public OAuth2Response requestLogin(Map<String, Object> authCode) {
        Map<String, Object> body = new HashMap<>();

        body.put("code", authCode.get("code"));
        body.put("grant_type", grantType);
        body.put("client_id", clientId);
        body.put("redirect_uri", redirectUri);
        body.put("client_secret", clientSecret);

        String parameterString = body.entrySet().stream()
                                       .map(x -> x.getKey() + "=" + x.getValue())
                                       .collect(Collectors.joining("&"));

        GoogleTokenResponse googleTokenResponse = googleAccessTokenClient.requestGoogleAccessToken(CONTENT_TYPE, parameterString);
        return googleProfileClient.requestGoogleProfile("Bearer " + googleTokenResponse.getAccessToken());
    }
}