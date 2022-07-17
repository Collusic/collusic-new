package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.web.auth.google.dto.GoogleTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "googleClient", url = "https://www.googleapis.com")
public interface GoogleClient {

    @PostMapping(value = "/oauth2/v4/token")
    GoogleTokenResponse requestGoogleAccessToken(
            @RequestHeader("Content-Type") String contentType,
            @RequestParam("code") String authorizationCode,
            @RequestParam("grant_type") String grantType,
            @RequestParam("client_id") String clientId,
            @RequestParam("client_secret") String clientSecret
    );
}
