package com.collusic.collusicbe.web.auth.google;

import com.collusic.collusicbe.web.auth.google.dto.GoogleProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "GoogleProfileClient", url = "https://www.googleapis.com")
public interface GoogleProfileClient {

    @GetMapping(value = "/oauth2/v3/userinfo", consumes = "application/json")
    GoogleProfileResponse requestGoogleProfile(
            @RequestHeader("Authorization") String accessToken
    );

}
