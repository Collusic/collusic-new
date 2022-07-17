package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.config.auth.dto.OAuthInfoResponseDto;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.Role;
import com.collusic.collusicbe.util.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.log.LogMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTGenerateFilter extends OAuth2LoginAuthenticationFilter {

    private final ObjectMapper objectMapper;

    public JWTGenerateFilter(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientService authorizedClientService, ObjectMapper objectMapper) {
        super(clientRegistrationRepository, authorizedClientService);
        this.objectMapper = objectMapper;
    }

    public JWTGenerateFilter(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientService authorizedClientService, String filterProcessesUrl, ObjectMapper objectMapper) {
        super(clientRegistrationRepository, authorizedClientService, filterProcessesUrl);
        this.objectMapper = objectMapper;
    }

    public JWTGenerateFilter(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientRepository authorizedClientRepository, String filterProcessesUrl, ObjectMapper objectMapper) {
        super(clientRegistrationRepository, authorizedClientRepository, filterProcessesUrl);
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        Authentication authentication = super.attemptAuthentication(request, response);
        if (authentication.getAuthorities().contains(Role.EXISTED_USER.getKey())) {
            throw new CannotSignUpException();
        }
        return authentication;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
        }

        if (authResult.getAuthorities().contains(Role.GUEST.getKey())) {
            OAuth2User oAuth2User = (OAuth2User) authResult.getPrincipal();
            String authId = (String) oAuth2User.getAttributes().get("authId");
            String email = (String) oAuth2User.getAttributes().get("email");
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(objectMapper.writeValueAsString(new OAuthInfoResponseDto(authId, email)));
            // 현재 authResult를 응답으로 넘겨주는데 authResult에는 authId와 email 이외의 정보도 포함됨.
            // 프론트에 응답을 정제해서 보내줄 필요성(?)
            return;
        }

        // JWT 발행
        // authResult의 email이 존재하는 위치 확인하기
        OAuth2User oAuth2User = (OAuth2User) authResult.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        response.setHeader("access_token", JWTUtil.createAccessToken(email));
        response.setHeader("refresh_token", JWTUtil.createRefreshToken(email));
    }
}