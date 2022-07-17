package com.collusic.collusicbe.web.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {

    private final OAuth2ProviderClientManager oAuth2ProviderClientManager;

    @GetMapping("/oauth2/login/{provider}")
    public String loginToSns(@PathVariable String provider, @RequestParam Map<String, Object> authCode) {
        OAuth2ClientService oAuth2Client = oAuth2ProviderClientManager.getClientService(provider);
        OAuth2Response response = oAuth2Client.requestLogin(authCode);

        return null;
    }
}
