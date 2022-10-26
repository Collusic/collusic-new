package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.web.auth.google.dto.GoogleProfileResponse;
import com.collusic.collusicbe.web.auth.kakao.dto.KakaoProfileResponse;
import com.collusic.collusicbe.web.auth.naver.dto.NaverProfileResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import static com.collusic.collusicbe.domain.member.Role.USER;
import static com.collusic.collusicbe.domain.member.SnsType.*;
import static com.collusic.collusicbe.web.auth.OAuth2LoginResponseType.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@AutoConfigureMockMvc
@SpringBootTest
public class OAuth2ControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    @Qualifier("googleClientService")
    private OAuth2ClientService googleClientService;

    @MockBean
    @Qualifier("kakaoClientService")
    private OAuth2ClientService kakaoClientService;

    @MockBean
    @Qualifier("naverClientService")
    private OAuth2ClientService naverClientService;

    @MockBean
    private MemberRepository memberRepository;

    private Map<String, Object> authCode;

    @BeforeEach
    void setUp() {
        authCode = new HashMap<>();
        authCode.put("code", "mockAuthCode");
    }

    @DisplayName("구글 인증 완료시 콜루직 서비스에 이메일이 존재하지 않으면 SIGN_UP 응답 타입과 회원가입 시 필요한 정보들을 반환한다 ")
    @Test
    public void test_signUp_situation_with_google_oauth_login() throws Exception {
        GoogleProfileResponse googleProfileResponse = googleProfileResponse();

        when(googleClientService.requestLogin(authCode)).thenReturn(googleProfileResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "google")
                                              .param("code", (String) authCode.get("code")))
               .andDo(print())
               .andExpect(jsonPath("$.responseType").value(SIGN_UP.name()))
               .andExpect(jsonPath("$.attributes.snsType").value(GOOGLE.name()))
               .andExpect(jsonPath("$.attributes.profileImageUrl").value(googleProfileResponse.getPicture()))
               .andExpect(jsonPath("$.attributes.email").value(googleProfileResponse.getEmail()))
               .andExpect(jsonPath("$.attributes.authId").value(googleProfileResponse.getSub()));
    }

    @DisplayName("카카오 인증 완료시 콜루직 서비스에 이메일이 존재하지 않으면 SIGN_UP 응답 타입과 회원가입 시 필요한 정보들을 반환한다 ")
    @Test
    public void test_signUp_situation_with_kakao_oauth_login() throws Exception {
        KakaoProfileResponse kakaoProfileResponse = kakaoProfileResponse();

        when(kakaoClientService.requestLogin(authCode)).thenReturn(kakaoProfileResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "kakao")
                                              .param("code", (String) authCode.get("code")))
               .andDo(print())
               .andExpect(jsonPath("$.responseType").value(SIGN_UP.name()))
               .andExpect(jsonPath("$.attributes.snsType").value(KAKAO.name()))
               .andExpect(jsonPath("$.attributes.profileImageUrl").value(kakaoProfileResponse.getPicture()))
               .andExpect(jsonPath("$.attributes.email").value(kakaoProfileResponse.getEmail()))
               .andExpect(jsonPath("$.attributes.authId").value(kakaoProfileResponse.getSub()));
    }

    @DisplayName("네이버 인증 완료시 콜루직 서비스에 이메일이 존재하지 않으면 SIGN_UP 응답 타입과 회원가입 시 필요한 정보들을 반환한다 ")
    @Test
    public void test_signUp_situation_with_naver_oauth_login() throws Exception {
        NaverProfileResponse naverProfileResponse = naverProfileResponse();

        when(naverClientService.requestLogin(authCode)).thenReturn(naverProfileResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "naver")
                                              .param("code", (String) authCode.get("code")))
               .andDo(print())
               .andExpect(jsonPath("$.responseType").value(SIGN_UP.name()))
               .andExpect(jsonPath("$.attributes.snsType").value(NAVER.name()))
               .andExpect(jsonPath("$.attributes.profileImageUrl").value(naverProfileResponse.getAttributes().get("picture")))
               .andExpect(jsonPath("$.attributes.email").value(naverProfileResponse.getAttributes().get("email")))
               .andExpect(jsonPath("$.attributes.authId").value(naverProfileResponse.getAttributes().get("sub")));
    }

    @DisplayName("구글 인증 완료시 콜루직 서비스에 가입된 경우 SIGN_IN 응답 타입과 액세스 토큰과 리프레시 토큰을 반환한다.")
    @Test
    public void test_signIn_situation_with_google_oauth_login() throws Exception {
        GoogleProfileResponse googleProfileResponse = googleProfileResponse();

        String email = "email";

        Member member = Member.builder()
                              .authId("authId")
                              .email(email)
                              .nickname("nickname")
                              .profileImageUrl("profileImageUrl")
                              .snsType(GOOGLE)
                              .role(USER)
                              .build();

        when(googleClientService.requestLogin(authCode)).thenReturn(googleProfileResponse);
        when(memberRepository.findByEmail(email)).thenReturn(Optional.ofNullable(member));

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "google")
                                              .param("code", (String) authCode.get("code")))
               .andDo(print())
               .andExpect(jsonPath("$.responseType").value(SIGN_IN.name()))
               .andExpect(jsonPath("$.attributes.accessToken").exists())
               .andExpect(jsonPath("$.attributes.refreshToken").exists());
    }

    @DisplayName("카카오 인증 완료시 콜루직 서비스에 가입된 경우 SIGN_IN 응답 타입과 액세스 토큰과 리프레시 토큰을 반환한다.")
    @Test
    public void test_signIn_situation_with_kakao_oauth_login() throws Exception {
        KakaoProfileResponse kakaoProfileResponse = kakaoProfileResponse();

        String email = "email";

        Member member = Member.builder()
                              .authId("authId")
                              .email(email)
                              .nickname("nickname")
                              .profileImageUrl("profileImageUrl")
                              .snsType(KAKAO)
                              .role(USER)
                              .build();

        when(kakaoClientService.requestLogin(authCode)).thenReturn(kakaoProfileResponse);
        when(memberRepository.findByEmail(email)).thenReturn(Optional.ofNullable(member));

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "kakao")
                                              .param("code", (String) authCode.get("code")))
               .andDo(print())
               .andExpect(jsonPath("$.responseType").value(SIGN_IN.name()))
               .andExpect(jsonPath("$.attributes.accessToken").exists())
               .andExpect(jsonPath("$.attributes.refreshToken").exists());
    }

    @DisplayName("네이버 인증 완료시 콜루직 서비스에 가입된 경우 SIGN_IN 응답 타입과 액세스 토큰과 리프레시 토큰을 반환한다.")
    @Test
    public void test_signIn_situation_with_naver_oauth_login() throws Exception {
        NaverProfileResponse naverProfileResponse = naverProfileResponse();

        String email = "email";

        Member member = Member.builder()
                              .authId("authId")
                              .email(email)
                              .nickname("nickname")
                              .profileImageUrl("profileImageUrl")
                              .snsType(NAVER)
                              .role(USER)
                              .build();

        when(naverClientService.requestLogin(authCode)).thenReturn(naverProfileResponse);
        when(memberRepository.findByEmail(email)).thenReturn(Optional.ofNullable(member));

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "naver")
                                              .param("code", (String) authCode.get("code")))
               .andDo(print())
               .andExpect(jsonPath("$.responseType").value(SIGN_IN.name()))
               .andExpect(jsonPath("$.attributes.accessToken").exists())
               .andExpect(jsonPath("$.attributes.refreshToken").exists());
    }

    @DisplayName("소셜 인증 완료시 다른 소셜 서비스의 이메일로 콜루직 서비스에 가입된 경우 INVALID 응답 타입과 알림 메시지를 반환한다.")
    @Test
    public void test() throws Exception {
        GoogleProfileResponse googleProfileResponse = googleProfileResponse();

        String email = "email";

        Member member = Member.builder()
                              .authId("authId")
                              .email(email)
                              .nickname("nickname")
                              .profileImageUrl("profileImageUrl")
                              .snsType(NAVER)
                              .role(USER)
                              .build();

        when(googleClientService.requestLogin(authCode)).thenReturn(googleProfileResponse);

        when(memberRepository.findByEmail(email)).thenReturn(Optional.ofNullable(member));

        mockMvc.perform(MockMvcRequestBuilders.get("/oauth2/login/" + "google")
                                              .param("code", (String) authCode.get("code")))
               .andDo(print())
               .andExpect(jsonPath("$.responseType").value(INVALID.name()))
               .andExpect(jsonPath("$.attributes.errorMessage").value("해당 email은 이미 다른 sns로 가입되어 있습니다."));
    }

    private GoogleProfileResponse googleProfileResponse() {
        GoogleProfileResponse googleProfileResponse = new GoogleProfileResponse();

        googleProfileResponse.setSub("sub");
        googleProfileResponse.setPicture("picture");
        googleProfileResponse.setEmail("email");
        googleProfileResponse.setEmailVerified("emailVerified");

        return googleProfileResponse;
    }

    private KakaoProfileResponse kakaoProfileResponse() {
        KakaoProfileResponse kakaoProfileResponse = new KakaoProfileResponse();

        kakaoProfileResponse.setSub("sub");
        kakaoProfileResponse.setPicture("picture");
        kakaoProfileResponse.setEmail("email");

        return kakaoProfileResponse;
    }

    private NaverProfileResponse naverProfileResponse() {
        Map<String, Object> naverProfileResponseAtrributes = new LinkedHashMap<>();

        naverProfileResponseAtrributes.put("email", "email");
        naverProfileResponseAtrributes.put("name", "name");
        naverProfileResponseAtrributes.put("id", "sub");
        naverProfileResponseAtrributes.put("profile_image", "picture");

        NaverProfileResponse naverProfileResponse = new NaverProfileResponse();

        naverProfileResponse.setResponse(naverProfileResponseAtrributes);

        return naverProfileResponse;
    }
}