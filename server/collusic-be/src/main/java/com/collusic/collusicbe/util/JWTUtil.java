package com.collusic.collusicbe.util;

import com.collusic.collusicbe.global.exception.jwt.ExpiredTokenException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JWTUtil {

    public static final int REFRESH_TIME = 60 * 60 * 24 * 7;
    public static final String KEY = "collusic-new";
    private static final int ACCESS_TIME = 60 * 60;

    public static String createAccessToken(String email, String role) {
        return Jwts.builder()
                   .setHeader(jwtHeaders())
                   .claim("email", email)
                   .claim("role", role)
                   .claim("exp", Instant.now().getEpochSecond() + ACCESS_TIME)
                   .signWith(SignatureAlgorithm.HS256, KEY)
                   .compact();
    }

    public static Claims verify(String token) {
        try {
            return Jwts.parser()
                       .setSigningKey(KEY)
                       .parseClaimsJws(token)
                       .getBody();
        } catch (ExpiredJwtException e) {
            log.info("토큰 만료");
            throw new ExpiredTokenException("토큰 만료");
        } catch (UnsupportedJwtException e) {
            log.info("애플리케이션에서 지원하지 않는 토큰 형식");
            throw new UnsupportedJwtException("애플리케이션에서 지원하지 않는 토큰 형식");
        } catch (MalformedJwtException e) {
            log.info("구조적인 문제가 있는 토큰");
            throw new MalformedJwtException("구조적인 문제가 있는 토큰");
        } catch (SignatureException e) {
            log.info("시그니처 검증 실패");
            throw new SignatureException("시그니처 검증 실패");
        } catch (IllegalArgumentException e) {
            log.info("부적합한 인수");
            throw new IllegalArgumentException("부적합한 인수");
        }
    }

    public static String createRefreshToken(String email, String role) {
        return Jwts.builder()
                   .setHeader(jwtHeaders())
                   .claim("email", email)
                   .claim("role", role)
                   .claim("exp", Instant.now().getEpochSecond() + REFRESH_TIME)
                   .signWith(SignatureAlgorithm.HS256, KEY)
                   .compact();
    }

    public static Map<String, Object> getClaims(String token) {
        Base64.Decoder decoder = Base64.getDecoder();
        String payload = new String(decoder.decode(token.split("\\.")[1]));

        ObjectMapper mapper = new ObjectMapper();

        try {
            Map<String, Object> claims = mapper.readValue(payload, Map.class);
            return claims;
        } catch (JsonProcessingException exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    public static String getEmail(String token) {
        return (String) getClaims(token).get("email");
    }

    public static String getRole(String token) {
        return (String) getClaims(token).get("role");
    }

    private static Map<String, Object> jwtHeaders() {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", SignatureAlgorithm.HS256);
        return headers;
    }
}