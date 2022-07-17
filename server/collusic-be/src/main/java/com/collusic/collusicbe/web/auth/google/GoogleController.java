package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.util.JWTUtil;
import com.collusic.collusicbe.web.auth.google.dto.GoogleTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class GoogleController {

    private static final String GOOGLE_CONTENT_TYPE = "application/x-www-form-urlencoded";
    private static final String GOOGLE_GRANT_TYPE = "authorization_code";

    private final GoogleClient googleClient;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret=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}")
    private String clientSecret;

    @GetMapping("/oauth2/login/google")
    public ResponseEntity<> socialLogin(@RequestParam String code) {
        GoogleTokenResponse googleTokenResponse = googleClient.requestGoogleAccessToken(GOOGLE_CONTENT_TYPE, code, GOOGLE_GRANT_TYPE, clientId, clientSecret);
        String email = JWTUtil.parseClaimToEmail(googleTokenResponse.getIdToken());
    }

}
