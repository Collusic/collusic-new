package com.collusic.collusicbe.global.auth;

import com.collusic.collusicbe.global.exception.jwt.ExpiredTokenException;
import com.collusic.collusicbe.global.util.JWTUtil;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JWTAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException, ExpiredTokenException {
        String token = (String) authentication.getPrincipal();

        JWTUtil.verify(token);
        authentication.setAuthenticated(true);

        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication == JWTAuthenticationToken.class;
    }
}