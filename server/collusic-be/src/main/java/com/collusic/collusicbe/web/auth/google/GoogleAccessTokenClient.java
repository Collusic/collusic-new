package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.web.auth.google.dto.GoogleTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "googleAccessTokenClient", url = "https://www.googleapis.com")
public interface GoogleAccessTokenClient {

    @PostMapping(value = "/oauth2/v4/token", consumes = "application/x-www-form-urlencoded")
    GoogleTokenResponse requestGoogleAccessToken(
            @RequestHeader("Content-Type") String contentType,
            @RequestBody String body
    );
}
