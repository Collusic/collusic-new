package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.domain.member.SnsType;
import com.collusic.collusicbe.global.util.CookieUtils;
import com.collusic.collusicbe.global.util.ParsingUtil;
import com.collusic.collusicbe.service.TokenService;
import com.collusic.collusicbe.web.controller.response.TokenResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {

    private final OAuth2ProviderClientManager oAuth2ProviderClientManager;
    private final MemberRepository memberRepository;
    private final TokenService tokenService;

    @Operation(summary = "sns 로그인", description = "sns로부터 받은 auth code를 query string으로 보내 로그인 및 회원정보 응답")
    @GetMapping("/oauth2/login/{provider}")
    public ResponseEntity<OAuth2LoginResponseDto> loginToSns(@PathVariable String provider, @RequestParam Map<String, Object> authCode, HttpServletRequest request, HttpServletResponse response) {
        OAuth2ClientService oAuth2ClientService = oAuth2ProviderClientManager.getClientService(provider);

        String referer = request.getHeader("Referer");
        OAuth2Response oAuth2Response = oAuth2ClientService.requestLogin(referer, authCode);

        String email = (String) oAuth2Response.getAttributes().get("email");
        String authId = (String) oAuth2Response.getAttributes().get("sub");
        String profileImageUrl = (String) oAuth2Response.getAttributes().get("picture");

        Optional<Member> member = memberRepository.findByEmail(email);
        OAuth2LoginResponseDto responseDto = afterOAuth2Login(response, member, SnsType.valueOf(provider.toUpperCase()), email, authId, profileImageUrl, ParsingUtil.getRemoteAddress(request));

        return ResponseEntity.ok(responseDto);
    }

    private OAuth2LoginResponseDto afterOAuth2Login(HttpServletResponse response, Optional<Member> member, SnsType snsType, String email, String authId, String profileImageUrl, String remoteAddress) {
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
            response.addCookie(CookieUtils.setCookieWith(tokens.getRefreshToken()));
            return OAuth2LoginResponseDto.builder()
                                         .responseType(OAuth2LoginResponseType.SIGN_IN)
                                         .accessToken(tokens.getAccessToken())
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
