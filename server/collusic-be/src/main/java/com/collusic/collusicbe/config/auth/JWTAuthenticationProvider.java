package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.util.JWTUtil;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JWTAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = (String) authentication.getPrincipal();
        JWTVerifyResult result = JWTUtil.verify(token);

        if (!result.isSuccess()) {
            throw new RuntimeException(result.getErrorMessage()); // TODO: 어떤 Exception 클래스를 사용할 것인지
        }

        authentication.setAuthenticated(true);

        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication == JWTAuthenticationToken.class;
    }
}
