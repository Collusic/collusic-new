package com.collusic.collusicbe.web.auth;

import com.collusic.collusicbe.domain.member.SnsType;
import com.collusic.collusicbe.service.AfterOAuth2Service;
import com.collusic.collusicbe.util.ParsingUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {

    private final OAuth2ProviderClientManager oAuth2ProviderClientManager;
    private final AfterOAuth2Service afterOAuth2Service;

    @Operation(summary = "sns 로그인", description = "sns로부터 받은 auth code를 query string으로 보내 로그인 및 회원정보 응답")
    @GetMapping("/oauth2/login/{provider}")
    public ResponseEntity<OAuth2LoginResponseDto> loginToSns(@PathVariable String provider, @RequestParam Map<String, String> authCode, HttpServletRequest request) {
        OAuth2ClientService oAuth2ClientService = oAuth2ProviderClientManager.getClientService(provider);
        OAuth2Response response = oAuth2ClientService.requestLogin(authCode);
        String email = (String) response.getAttributes().get("email");
        String authId = (String) response.getAttributes().get("sub");
        String profileImageUrl = (String) response.getAttributes().get("picture");

        OAuth2LoginResponseDto responseDto = afterOAuth2Service.executeAfterOAuth2Login(SnsType.valueOf(provider.toUpperCase()), email, authId, profileImageUrl, ParsingUtil.getRemoteAddress(request));

        return ResponseEntity.ok(responseDto);
    }
}