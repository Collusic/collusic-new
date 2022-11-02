package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
public class TokenController {

    private final static String BEARER_PREFIX = "Bearer ";

    @Operation(summary = "토큰 재발급", description = "refresh token을 통한 access token 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<String> reissue(HttpServletResponse response) {
        String bearer = response.getHeader("Authorization");
        String token = bearer.substring(BEARER_PREFIX.length());
        String accessToken = JWTUtil.createAccessToken(JWTUtil.getEmail(token), JWTUtil.getRole(token));
        response.setHeader("Authorization", BEARER_PREFIX + accessToken);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(accessToken);
    }

    // TODO : refresh token 무효화 api -> 사실상 로그아웃
}
