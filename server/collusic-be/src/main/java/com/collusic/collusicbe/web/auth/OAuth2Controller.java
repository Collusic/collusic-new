package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.domain.member.SnsType;
import com.collusic.collusicbe.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {

    private final OAuth2ProviderClientManager oAuth2ProviderClientManager;
    private final MemberRepository memberRepository;

    @GetMapping("/oauth2/login/{provider}")
    public ResponseEntity<OAuth2LoginResponseDto> loginToSns(@PathVariable String provider, @RequestParam Map<String, Object> authCode) {
        OAuth2ClientService oAuth2ClientService = oAuth2ProviderClientManager.getClientService(provider);
        OAuth2Response response = oAuth2ClientService.requestLogin(authCode);
        String email = (String) response.getAttributes().get("email");
        String authId = (String) response.getAttributes().get("sub");

        Optional<Member> member = memberRepository.findByEmail(email);
        OAuth2LoginResponseDto responseDto = afterOAuth2Login(member, SnsType.valueOf(provider.toUpperCase()), email, authId);

        return ResponseEntity.ok(responseDto);
    }

    private OAuth2LoginResponseDto afterOAuth2Login(Optional<Member> member, SnsType snsType, String email, String authId) {
        if (!member.isPresent()) {
            return OAuth2LoginResponseDto.builder()
                                         .responseType(OAuth2LoginResponseType.SIGN_UP)
                                         .snsType(snsType)
                                         .email(email)
                                         .authId(authId)
                                         .build();
        }

        if (validateUserAttributes(member.get(), snsType)) {
            return OAuth2LoginResponseDto.builder()
                                         .responseType(OAuth2LoginResponseType.SIGN_IN)
                                         .accessToken(JWTUtil.createAccessToken(email, member.get().getRole().getKey()))
                                         .refreshToken(JWTUtil.createRefreshToken(email, member.get().getRole().getKey()))
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
