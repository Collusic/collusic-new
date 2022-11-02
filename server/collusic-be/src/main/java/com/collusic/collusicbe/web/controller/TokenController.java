package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.TokenService;
import com.collusic.collusicbe.util.JWTUtil;
import com.collusic.collusicbe.util.ParsingUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class TokenController {

    private final static String BEARER_PREFIX = "Bearer ";

    private final TokenService tokenService;

    @Operation(summary = "토큰 재발급", description = "refresh token을 통한 access token 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<String> reissue(@RequestHeader("Authorization") String token, HttpServletRequest request) {
        token = token.substring(BEARER_PREFIX.length());
        String remoteAddress = ParsingUtil.getRemoteAddress(request);

        JWTUtil.verify(token);

        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(tokenService.reissueAccessToken(token, remoteAddress));
    }

    // TODO : refresh token 무효화 api -> 사실상 로그아웃
}
