package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.domain.member.Role;
import com.collusic.collusicbe.util.JWTUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

public class JWTAuthenticationFilter extends BasicAuthenticationFilter {

    private final static String BEARER_PREFIX = "Bearer ";

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 인가처리를 위한 access token을 어떻게 받을지 결정해야할 필요가 있음
        // 1. Bearer 방식 : 요청 헤더의 'Authorization'으로 'Berer {jwt token}' 형식의 값이 담기는 방식
        // 2. 전용 헤더를 만들어 넘기는 방식
        // -> 개인적으로 1번이 좋다고 생각. 표준?을 따르는게 좋지 않을까 싶기도 하고, 커스텀 헤더 사용시 cors 관련 이슈도 있기 때문

        String bearer = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (bearer == null || !bearer.startsWith(BEARER_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String token = bearer.substring(BEARER_PREFIX.length());
        JWTVerifyResult result = JWTUtil.verify(token);

        if (!result.isSuccess()) {
            throw new RuntimeException(result.getErrorMessage()); // TODO: 어떤 Exception 클래스를 사용할 것인지
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                result.getClaims().get("email"),
                null,
                Set.of((GrantedAuthority) Role.USER::getKey) // GrantedAuthority 를 생각하면 JWT에 담기는 값에 role이 추가되어야하지 않을까 생각됨
        );

        SecurityContextHolder.getContext()
                             .setAuthentication(authentication);

        chain.doFilter(request, response);
    }
}
