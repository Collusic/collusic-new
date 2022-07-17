package com.collusic.collusicbe.web.auth.naver;

import com.collusic.collusicbe.web.auth.OAuth2Client;
import com.collusic.collusicbe.web.auth.naver.dto.NaverTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "NaverClient", url = "https://nid.naver.com")
public interface NaverClient extends OAuth2Client {

    @PostMapping(value = "/oauth2.0/token", consumes = "application/json")
    NaverTokenResponse requestKakaoToken(
            @RequestHeader("Content-Type") String contentType,
            @RequestParam("grant_type") String grantType,
            @RequestParam("client_id") String clientId,
            @RequestParam("client_secret") String clientSecret,
            @RequestParam("code") String code,
            @RequestParam("state") String state
    );
}
