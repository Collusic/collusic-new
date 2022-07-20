package com.collusic.collusicbe.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class JWTUtil {

    private static final long ACCESS_TIME = 60 * 60;
    private static final long REFRESH_TIME = 60 * 60 * 24 * 7;
    public static final String KEY = "collusic-new";

    public static String createAccessToken(String email) {
        return Jwts.builder()
                   .setHeader(jwtHeaders())
                   .claim("email", email)
                   .claim("exp", Instant.now().getEpochSecond() + ACCESS_TIME)
                   .signWith(SignatureAlgorithm.HS256, KEY)
                   .compact();
    }

    public static Jws<Claims> verify(String token) {
        return Jwts.parser()
                   .setSigningKey(KEY)
                   .parseClaimsJws(token);
    }

    public static String createRefreshToken(String email) {
        return Jwts.builder()
                   .setHeader(jwtHeaders())
                   .claim("email", email)
                   .claim("exp", Instant.now().getEpochSecond() + REFRESH_TIME)
                   .signWith(SignatureAlgorithm.HS256, KEY)
                   .compact();
    }

    public static String parseClaimToEmail(String token) {
        return (String) Jwts.parser()
                            .setSigningKey(kid)
                            .parseClaimsJws(token)
                            .getBody()
                            .get("email");
    }

    private static Map<String, Object> jwtHeaders() {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", SignatureAlgorithm.HS256);
        return headers;
    }
}