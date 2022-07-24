package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.service.MemberService;
import com.collusic.collusicbe.util.JWTUtil;
import com.collusic.collusicbe.web.auth.OAuth2LoginResponseType;
import com.collusic.collusicbe.web.controller.dto.SignUpRequestDto;
import com.collusic.collusicbe.web.controller.dto.SignUpResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/members")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody SignUpRequestDto signUpRequestDto) { // TODO: validation
        Member member = memberService.signUp(signUpRequestDto);

        SignUpResponseDto responseBody = SignUpResponseDto.builder()
                                                          .responseType(OAuth2LoginResponseType.SIGN_IN)
                                                          .accessToken(JWTUtil.createAccessToken(member.getEmail(), member.getRole().getKey()))
                                                          .refreshToken(JWTUtil.createRefreshToken(member.getEmail(), member.getRole().getKey()))
                                                          .build();
        return ResponseEntity.ok(responseBody);
    }
}
