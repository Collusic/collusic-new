package com.collusic.collusicbe.global.util;

import com.collusic.collusicbe.domain.member.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.SneakyThrows;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class JWTUtilTest {

    @DisplayName("액세스 토큰 생성 테스트")
    @Test
    void createAccessTokenTest() {
        // given
        String email = "collusic-new@gmail.com";
        String token = JWTUtil.createAccessToken(email, Role.USER.getKey());

        // when
        Jws<Claims> tokenInfo = Jwts.parser().setSigningKey(JWTUtil.KEY).parseClaimsJws(token);

        // then
        assertEquals(email, tokenInfo.getBody().get("email"));
    }

    @SneakyThrows
    @DisplayName("토큰 유효성 테스트")
    @Test
    void verifyTokenTest() {
        // given
        String email = "collusic-new@gmail.com";

        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", SignatureAlgorithm.HS256);

        String token = Jwts.builder()
                           .setHeader(headers)
                           .claim("email", email)
                           .claim("exp", Instant.now().getEpochSecond() + 60 * 60)
                           .signWith(SignatureAlgorithm.HS256, JWTUtil.KEY)
                           .compact();

        // when & then
        assertDoesNotThrow(() -> JWTUtil.verify(token));
    }

    @DisplayName("리프레시 토큰 생성 테스트")
    @Test
    void createRefreshTokenTest() {
        // given
        String email = "collusic-new@gmail.com";
        String token = JWTUtil.createRefreshToken(email, Role.USER.getKey());

        // when
        Jws<Claims> tokenInfo = Jwts.parser().setSigningKey(JWTUtil.KEY).parseClaimsJws(token);

        // then
        assertEquals(email, tokenInfo.getBody().get("email"));
    }
}
