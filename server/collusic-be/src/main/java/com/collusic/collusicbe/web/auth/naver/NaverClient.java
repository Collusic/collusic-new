package com.collusic.collusicbe.web.auth.naver;

import com.collusic.collusicbe.web.auth.naver.dto.NaverProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "NaverClient", url = "https://openapi.naver.com")
public interface NaverClient {

    @GetMapping(value = "/v1/nid/me", consumes = "application/json")
    NaverProfileResponse requestNaverProfile(
            @RequestHeader("Authorization") String accessToken
    );
}
