package com.collusic.collusicbe.service;

import com.collusic.collusicbe.global.exception.jwt.AbnormalAccessException;
import com.collusic.collusicbe.util.JWTUtil;
import com.collusic.collusicbe.web.controller.dto.TokenResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.Duration;

import static com.collusic.collusicbe.util.JWTUtil.REFRESH_TIME;

@RequiredArgsConstructor
@Service
public class TokenService {

    private final RedisRepository redisRepository;

    public TokenResponseDto reissue(String refreshToken, String remoteAddress) {
        String reissuedAccessToken = reissueAccessToken(refreshToken, remoteAddress);
        String reissuedRefreshToken = reissueRefreshToken(refreshToken, remoteAddress);

        return new TokenResponseDto(reissuedAccessToken, reissuedRefreshToken);
    }

    public TokenResponseDto issue(String email, String role, String remoteAddress) {
        String accessToken = JWTUtil.createAccessToken(email, role);
        String refreshToken = JWTUtil.createRefreshToken(email, role);

        long time = 30L;
        redisRepository.save(refreshToken, remoteAddress, Duration.ofSeconds(time));

        return new TokenResponseDto(accessToken, refreshToken);
    }

    public void deleteRefreshToken(String refreshToken) {
        redisRepository.delete(refreshToken);
    }

    public String reissueAccessToken(String refreshToken, String remoteAddress) {

        if (!redisRepository.hasKey(refreshToken)) {
            throw new EntityNotFoundException("토큰이 존재하지 않습니다.");
        }

        if (!redisRepository.findByKey(refreshToken).equals(remoteAddress)) {
            throw new AbnormalAccessException("사용자의 IP 주소가 다릅니다."); // TODO: 비정상적인 접근으로 redis에서 refreshtoken을 지워줘야함
        }

        String email = JWTUtil.getEmail(refreshToken);
        String role = JWTUtil.getRole(refreshToken);

        return JWTUtil.createAccessToken(email, role);
    }

    private String reissueRefreshToken(String refreshToken, String remoteAddress) {
        redisRepository.delete(refreshToken);

        String email = JWTUtil.getEmail(refreshToken);
        String role = JWTUtil.getRole(refreshToken);

        String token = JWTUtil.createRefreshToken(email, role);

        redisRepository.save(token, remoteAddress, Duration.ofSeconds(REFRESH_TIME));

        return token;
    }
}