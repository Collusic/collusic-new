package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.web.controller.response.ReissuedTokenDto;
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
    public ResponseEntity<ReissuedTokenDto> reissue(HttpServletResponse response) {
        String bearer = response.getHeader("Authorization");
        String accessToken = bearer.substring(BEARER_PREFIX.length());
        response.setHeader("Authorization", null);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(new ReissuedTokenDto(accessToken));
    }
}
