package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.service.MemberService;
import com.collusic.collusicbe.service.TokenService;
import com.collusic.collusicbe.util.ParsingUtil;
import com.collusic.collusicbe.web.auth.OAuth2LoginResponseType;
import com.collusic.collusicbe.web.controller.dto.SignUpRequestDto;
import com.collusic.collusicbe.web.controller.dto.SignUpResponseDto;
import com.collusic.collusicbe.web.controller.dto.TokenResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;
    private final TokenService tokenService;

    @Operation(summary = "회원가입", description = "회원정보를 통해 회원가입 후 성공 시 access token, refresh token 응답")
    @PostMapping("/members")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody SignUpRequestDto signUpRequestDto, HttpServletRequest request) { // TODO: validation
        Member member = memberService.signUp(signUpRequestDto);
        TokenResponseDto tokens = tokenService.issue(member.getEmail(), member.getRole().getKey(), ParsingUtil.getRemoteAddress(request));

        SignUpResponseDto responseBody = SignUpResponseDto.builder()
                                                          .responseType(OAuth2LoginResponseType.SIGN_IN)
                                                          .accessToken(tokens.getAccessToken())
                                                          .refreshToken(tokens.getRefreshToken())
                                                          .build();
        return ResponseEntity.ok(responseBody);
    }
}
