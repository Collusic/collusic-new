package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.web.auth.google.GoogleClientService;
import com.collusic.collusicbe.web.auth.kakao.KakaoClientService;
import com.collusic.collusicbe.web.auth.naver.NaverClientService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
class OAuth2ProviderClientManagerTest {

    @Spy
    @InjectMocks
    private OAuth2ProviderClientManager oAuth2ProviderClientManager;

    @Mock
    private GoogleClientService googleClientService;

    @Mock
    private KakaoClientService kakaoClientService;

    @Mock
    private NaverClientService naverClientService;

    @DisplayName("구글 클라이언트 서비스 객체 반환 테스트")
    @Test
    public void getClientService_provider_GOOGLE_returnGoogleClientService() {
        String provider = "google";

        doReturn(googleClientService).when(oAuth2ProviderClientManager).getClientService(provider);

        assertThat(oAuth2ProviderClientManager.getClientService(provider)).isInstanceOf(GoogleClientService.class);
    }

    @DisplayName("카카오 클라이언트 서비스 객체 반환 테스트")
    @Test
    public void getClientService_provider_KAKAO_returnKakaoClientService() {
        String provider = "kakao";

        doReturn(kakaoClientService).when(oAuth2ProviderClientManager).getClientService(provider);

        assertThat(oAuth2ProviderClientManager.getClientService(provider)).isInstanceOf(KakaoClientService.class);
    }

    @DisplayName("네이버 클라이언트 서비스 객체 반환 테스트")
    @Test
    public void getClientService_provider_NAVER_returnNaverClientService() {
        String provider = "naver";

        doReturn(naverClientService).when(oAuth2ProviderClientManager).getClientService(provider);

        assertThat(oAuth2ProviderClientManager.getClientService(provider)).isInstanceOf(NaverClientService.class);
    }

}