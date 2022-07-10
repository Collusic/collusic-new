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
    public static final String KEY = "collusic-new";

    public static String createAccessToken(String email) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", SignatureAlgorithm.HS256);

        return Jwts.builder()
                   .setHeader(headers)
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
}