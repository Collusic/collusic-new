package com.collusic.collusicbe.web.auth.kakao;

import com.collusic.collusicbe.web.auth.OAuth2Client;
import com.collusic.collusicbe.web.auth.kakao.dto.KakaoTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "KakaoClient", url = "https://kauth.kakao.com")
public interface KakaoClient extends OAuth2Client {

    @PostMapping(value = "/oauth/token", consumes = "application/json")
    KakaoTokenResponse requestKakaoToken(
            @RequestHeader("Content-Type") String contentType,
            @RequestParam("grant_type") String grantType,
            @RequestParam("client_id") String clientId,
            @RequestParam("redirect_uri") String redirectUri,
            @RequestParam("code") String code,
            @RequestParam("client_secret") String clientSecret
    );
}
