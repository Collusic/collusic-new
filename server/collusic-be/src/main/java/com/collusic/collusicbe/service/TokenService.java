package com.collusic.collusicbe.service;

import com.collusic.collusicbe.global.exception.jwt.AbnormalAccessException;
import com.collusic.collusicbe.global.util.JWTUtil;
import com.collusic.collusicbe.web.controller.response.TokenResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;

import static com.collusic.collusicbe.global.util.JWTUtil.REFRESH_TIME;

@RequiredArgsConstructor
@Service
public class TokenService {

    private final RedisRepository redisRepository;

    public TokenResponseDto issue(String email, String role, String remoteAddress) {
        String accessToken = JWTUtil.createAccessToken(email, role);
        String refreshToken = JWTUtil.createRefreshToken(email, role);

        redisRepository.save(refreshToken, remoteAddress, Duration.ofSeconds(REFRESH_TIME));

        return new TokenResponseDto(accessToken, refreshToken);
    }

    public void deleteRefreshToken(String refreshToken) {
        redisRepository.delete(refreshToken);
    }

    public String reissueAccessToken(String refreshToken, String remoteAddress) {

        if (!redisRepository.findByKey(refreshToken).equals(remoteAddress)) {
            throw new AbnormalAccessException("사용자의 IP 주소가 다릅니다.");
        }

        String email = JWTUtil.getEmail(refreshToken);
        String role = JWTUtil.getRole(refreshToken);

        return JWTUtil.createAccessToken(email, role);
    }
}