package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.config.auth.JWTAuthenticationFilter;
import com.collusic.collusicbe.domain.member.SnsType;
import com.collusic.collusicbe.service.AfterOAuth2Service;
import com.collusic.collusicbe.util.ParsingUtil;
import com.collusic.collusicbe.web.auth.google.dto.GoogleProfileResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers=OAuth2Controller.class)
@AutoConfigureMockMvc(addFilters = false)
@ContextConfiguration(classes = JWTAuthenticationFilter.class)
class OAuth2ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SpyBean
    private OAuth2ProviderClientManager oAuth2ProviderClientManager;

    @MockBean
    @Qualifier("googleClientService")
    private OAuth2ClientService googleClientService;

    @MockBean
    private AfterOAuth2Service afterOAuth2Service;

    @MockBean
    private JWTAuthenticationFilter jwtAuthenticationFilter;

    private MockHttpServletRequest request;

    @BeforeEach
    void setUp() {
        request = new MockHttpServletRequest();
    }

//    @WithMockUser(username = "test")
    @DisplayName("회원가입 케이스 테스트")
    @Test
    public void test() throws Exception {
        Map<String, Object> authCode = new HashMap<>();
        authCode.put("code", "authCode");

        GoogleProfileResponse googleProfileResponse = googleProfileResponse();

        when(googleClientService.requestLogin(authCode)).thenReturn(googleProfileResponse());
        when(afterOAuth2Service.executeAfterOAuth2Login(SnsType.GOOGLE, googleProfileResponse.getEmail(), googleProfileResponse.getSub(), googleProfileResponse.getPicture(), ParsingUtil.getRemoteAddress(request))).thenReturn(oAuth2LoginResponseDto(OAuth2LoginResponseType.SIGN_UP));

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "google")
                                              .param("code", (String) authCode.get("code")))
                .andDo(print());
    }

    @DisplayName("로그인 케이스 테스트")
    @Test
    public void test2() {

    }

    @DisplayName("이미 다른 SNS로 가입된 케이스 테스트")
    public void test3() {

    }

    private GoogleProfileResponse googleProfileResponse() {
        GoogleProfileResponse googleProfileResponse = new GoogleProfileResponse();
        googleProfileResponse.setSub("sub");
        googleProfileResponse.setPicture("picture");
        googleProfileResponse.setEmail("email");
        googleProfileResponse.setEmailVerified("emailVerified");
        return  googleProfileResponse;
    }

    private OAuth2LoginResponseDto oAuth2LoginResponseDto(OAuth2LoginResponseType oAuth2LoginResponseType) {
        OAuth2LoginResponseDto oAuth2LoginResponseDto = OAuth2LoginResponseDto.builder()
                .responseType(oAuth2LoginResponseType)
                .snsType(SnsType.GOOGLE)
                .email("email")
                .authId("authId")
                .profileImageUrl("profileImageUrl")
                .build();
        return oAuth2LoginResponseDto;
    }
}