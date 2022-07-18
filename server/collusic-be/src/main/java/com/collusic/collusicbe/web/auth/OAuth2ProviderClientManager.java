package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.SnsType;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class OAuth2ProviderClientManager {

    @Qualifier("googleClientService")
    private final OAuth2ClientService googleClientService;

    @Qualifier("kakaoClientService")
    private final OAuth2ClientService kakaoClientService;

    @Qualifier("naverClientService")
    private final OAuth2ClientService naverClientService;

    public OAuth2ProviderClientManager(OAuth2ClientService googleClientService, OAuth2ClientService kakaoClientService, OAuth2ClientService naverClientService) {
        this.googleClientService = googleClientService;
        this.kakaoClientService = kakaoClientService;
        this.naverClientService = naverClientService;
    }

    public OAuth2ClientService getClientService(String provider) {
        provider = provider.toUpperCase();

        if (provider.equals(SnsType.NAVER.name())) {
            return naverClientService;
        }

        if (provider.equals(SnsType.KAKAO.name())) {
            return kakaoClientService;
        }

        return googleClientService;
    }
}
