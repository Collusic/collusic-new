package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.domain.member.SnsType;
import com.collusic.collusicbe.web.auth.OAuth2LoginResponseDto;
import com.collusic.collusicbe.web.controller.dto.TokenResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static com.collusic.collusicbe.domain.member.Role.USER;
import static com.collusic.collusicbe.domain.member.SnsType.GOOGLE;
import static com.collusic.collusicbe.domain.member.SnsType.NAVER;
import static com.collusic.collusicbe.web.auth.OAuth2LoginResponseType.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
class AfterOAuth2ServiceTest {

    @Spy
    @InjectMocks
    private AfterOAuth2Service afterOAuth2Service;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private TokenService tokenService;

    private SnsType snsType;

    private String email;

    private String authId;

    private String profileImageUrl;

    private String remoteAddress;

    @BeforeEach
    void setUp() {
        snsType = GOOGLE;
        email = "email";
        authId = "authId";
        profileImageUrl = "profileImageUrl";
        remoteAddress = "127.0.0.1";
    }

    @DisplayName("가입된 이메일이 존재하지 않으면 회원 가입 응답 데이터를 반환한다.")
    @Test
    public void email_not_exist_return_signUp_response_Data() {
        when(memberRepository.findByEmail(email)).thenReturn(Optional.empty());

        OAuth2LoginResponseDto responseDto = afterOAuth2Service.executeAfterOAuth2Login(snsType, email, authId, profileImageUrl, remoteAddress);

        assertThat(responseDto.getResponseType()).isEqualTo(SIGN_UP);
        assertThat(responseDto.getAttributes().get("snsType")).isEqualTo(snsType);
        assertThat(responseDto.getAttributes().get("email")).isEqualTo(email);
        assertThat(responseDto.getAttributes().get("authId")).isEqualTo(authId);
        assertThat(responseDto.getAttributes().get("profileImageUrl")).isEqualTo(profileImageUrl);
    }

    @DisplayName("가입된 이메일이 존재하고 snsType이 일치한 경우 로그인 응답 데이터를 반환한다.")
    @Test
    public void email_exist_and_same_snsType_return_signIn_response_Data() {
        Member member = Member.builder()
                .snsType(snsType)
                .authId(authId)
                .profileImageUrl(profileImageUrl)
                .email(email)
                .role(USER)
                .build();

        TokenResponseDto tokenResponseDto = new TokenResponseDto("accessToken", "refreshToken");

        when(memberRepository.findByEmail(email)).thenReturn(Optional.ofNullable(member));
        when(tokenService.issue(email, member.getRole().getKey(), remoteAddress)).thenReturn(tokenResponseDto);

        OAuth2LoginResponseDto responseDto = afterOAuth2Service.executeAfterOAuth2Login(snsType, email, authId, profileImageUrl, remoteAddress);

        assertThat(responseDto.getResponseType()).isEqualTo(SIGN_IN);
        assertThat(responseDto.getAttributes().get("accessToken")).isEqualTo(tokenResponseDto.getAccessToken());
        assertThat(responseDto.getAttributes().get("refreshToken")).isEqualTo(tokenResponseDto.getRefreshToken());
    }

    @DisplayName("가입된 이메일이 존재하지만 snsType이 일치하지 않을 경우 유효하지 않은 응답 데이터를 반환한다.")
    @Test
    public void email_exist_and_different_snsType_return_signUp_response_Data() {
        SnsType differentSnsType = NAVER;

        Member member = Member.builder()
                              .snsType(differentSnsType)
                              .authId(authId)
                              .profileImageUrl(profileImageUrl)
                              .email(email)
                              .role(USER)
                              .build();

        when(memberRepository.findByEmail(email)).thenReturn(Optional.ofNullable(member));

        OAuth2LoginResponseDto responseDto = afterOAuth2Service.executeAfterOAuth2Login(snsType, email, authId, profileImageUrl, remoteAddress);

        assertThat(responseDto.getResponseType()).isEqualTo(INVALID);
        assertThat(responseDto.getAttributes().get("message")).isEqualTo("해당 email은 이미 다른 sns로 가입되어 있습니다.");
    }
}