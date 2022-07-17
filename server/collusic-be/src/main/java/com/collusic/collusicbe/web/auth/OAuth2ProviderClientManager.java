package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.SnsType;
import com.collusic.collusicbe.web.auth.google.GoogleClient;
import com.collusic.collusicbe.web.auth.kakao.KakaoClient;
import com.collusic.collusicbe.web.auth.naver.NaverClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2ProviderClientManager {

    private final GoogleClient googleClient;
    private final KakaoClient kakaoClient;
    private final NaverClient naverClient;

    public OAuth2Client getClient(String provider) {
        provider = provider.toUpperCase();

        if (provider.equals(SnsType.NAVER.name())) {
            return naverClient;
        }

        if (provider.equals(SnsType.KAKAO.name())) {
            return kakaoClient;
        }

        return googleClient;
    }
}
