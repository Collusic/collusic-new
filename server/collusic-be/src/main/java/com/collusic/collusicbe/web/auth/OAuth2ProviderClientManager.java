package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.SnsType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2ProviderClientManager {

    private final OAuth2ClientService googleClient;
    private final OAuth2ClientService kakaoClient;
    private final OAuth2ClientService naverClient;

    public OAuth2ClientService getClientService(String provider) {
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
