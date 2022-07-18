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
        OAuth2ClientService oAuth2Client = oAuth2ProviderClientManager.getClientService(provider);
        OAuth2Response response = oAuth2Client.requestLogin(authCode);

        return null;
    }
}
