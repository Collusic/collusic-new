package com.collusic.collusicbe.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.Instant;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class JWTUtil {

    private static final long ACCESS_TIME = 60 * 60;
    private static final long REFRESH_TIME = 60 * 60 * 24 * 7;
    public static final String KEY = "collusic-new";

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
        } catch (Exception exception) {
            throw new RuntimeException("토큰 만료"); // TODO : 어떤 에러 메시지를 보낼 것인가?
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