package com.collusic.collusicbe.web.auth.kakao;

import com.collusic.collusicbe.web.auth.kakao.dto.KakaoProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "KakaoProfileClient", url = "https://kapi.kakao.com")
public interface KakaoProfileClient {

    @GetMapping(value = "/v1/oidc/userinfo", consumes = "application/x-www-form-urlencoded;charset=utf-8")
    KakaoProfileResponse requestKakaoProfile(
            @RequestHeader("Content-type") String contentType,
            @RequestHeader("Authorization") String accessToken
    );
}