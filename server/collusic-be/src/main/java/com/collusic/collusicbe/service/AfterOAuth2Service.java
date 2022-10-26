package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.domain.member.SnsType;
import com.collusic.collusicbe.web.auth.OAuth2LoginResponseDto;
import com.collusic.collusicbe.web.auth.OAuth2LoginResponseType;
import com.collusic.collusicbe.web.controller.dto.TokenResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AfterOAuth2Service {

    private final MemberRepository memberRepository;
    private final TokenService tokenService;

    public OAuth2LoginResponseDto executeAfterOAuth2Login(SnsType snsType, String email, String authId, String profileImageUrl, String remoteAddress) {
        Optional<Member> member = memberRepository.findByEmail(email);
        OAuth2LoginResponseDto responseDto = afterOAuth2Login(member, snsType, email, authId, profileImageUrl, remoteAddress);
        return responseDto;
    }

    private OAuth2LoginResponseDto afterOAuth2Login(Optional<Member> member, SnsType snsType, String email, String authId, String profileImageUrl, String remoteAddress) {
        if (!member.isPresent()) {
            return OAuth2LoginResponseDto.builder()
                                         .responseType(OAuth2LoginResponseType.SIGN_UP)
                                         .snsType(snsType)
                                         .email(email)
                                         .authId(authId)
                                         .profileImageUrl(profileImageUrl)
                                         .build();
        }

        if (validateUserAttributes(member.get(), snsType)) {
            TokenResponseDto tokens = tokenService.issue(email, member.get().getRole().getKey(), remoteAddress);
            return OAuth2LoginResponseDto.builder()
                                         .responseType(OAuth2LoginResponseType.SIGN_IN)
                                         .accessToken(tokens.getAccessToken())
                                         .refreshToken(tokens.getRefreshToken())
                                         .build();
        }

        return OAuth2LoginResponseDto.builder()
                                     .responseType(OAuth2LoginResponseType.INVALID)
                                     .snsType(snsType)
                                     .message("해당 email은 이미 다른 sns로 가입되어 있습니다.")
                                     .build();
    }

    private boolean validateUserAttributes(Member member, SnsType snsType) {
        return member.isSameSnsType(snsType.name());
    }
}