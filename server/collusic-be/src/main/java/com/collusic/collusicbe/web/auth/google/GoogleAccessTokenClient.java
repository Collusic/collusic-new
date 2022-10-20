package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.web.auth.google.dto.GoogleTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "googleAccessTokenClient", url = "https://www.googleapis.com")
public interface GoogleAccessTokenClient {

    @PostMapping(value = "/oauth2/v4/token", consumes = "application/x-www-form-urlencoded")
    GoogleTokenResponse requestGoogleAccessToken(
            @RequestHeader("Content-Type") String contentType,
            @RequestParam("grant_type") String grantType,
            @RequestParam("client_id") String clientId,
            @RequestParam("redirect_uri") String redirectUri,
            @RequestParam("code") String code,
            @RequestParam("client_secret") String clientSecret
    );
}
