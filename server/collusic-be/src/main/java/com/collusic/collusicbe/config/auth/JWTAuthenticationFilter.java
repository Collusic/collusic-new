package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.global.exception.jwt.AbnormalAccessException;
import com.collusic.collusicbe.service.TokenService;
import com.collusic.collusicbe.util.JWTUtil;
import com.collusic.collusicbe.util.ParsingUtil;
import com.collusic.collusicbe.global.exception.jwt.ExpiredTokenException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.persistence.EntityNotFoundException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.Set;

public class JWTAuthenticationFilter extends BasicAuthenticationFilter {

    private final static String BEARER_PREFIX = "Bearer ";

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, TokenService tokenService) {
        super(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException, ExpiredTokenException {

        String bearer = request.getHeader(HttpHeaders.AUTHORIZATION);

        String refreshToken = extractRefreshToken(request);

        if ((bearer == null || !bearer.startsWith(BEARER_PREFIX)) && refreshToken == null) {
            chain.doFilter(request, response);
            return;
        }

        try {
            if (bearer == null || !bearer.startsWith(BEARER_PREFIX)) {
                throw new NullPointerException();
            }

            String token = bearer.substring(BEARER_PREFIX.length());

            JWTAuthenticationToken authenticationToken = new JWTAuthenticationToken(token, Set.of(new SimpleGrantedAuthority(JWTUtil.getRole(token))));
            Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext()
                                 .setAuthentication(authentication);

            chain.doFilter(request, response);
        } catch (ExpiredTokenException | NullPointerException e) {
            authenticateWithRefreshToken(request, response, chain, refreshToken);
        }
    }

    private void authenticateWithRefreshToken(HttpServletRequest request, HttpServletResponse response, FilterChain chain, String refreshToken) throws IOException, ServletException {
        try {
            JWTAuthenticationToken authenticationToken = new JWTAuthenticationToken(refreshToken, Set.of(new SimpleGrantedAuthority(JWTUtil.getRole(refreshToken))));
            Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

            String token = tokenService.reissueAccessToken(refreshToken, ParsingUtil.getRemoteAddress(request));
            response.setHeader("Authorization", BEARER_PREFIX + token);

            SecurityContextHolder.getContext()
                                 .setAuthentication(authentication);

            chain.doFilter(request, response);
        } catch (ExpiredTokenException | EntityNotFoundException | AbnormalAccessException e) {
            tokenService.deleteRefreshToken(refreshToken);
            throw e;
        }
    }

    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = Optional.ofNullable(request.getCookies())
                                   .orElseGet(() -> new Cookie[]{});

        Cookie cookie = Arrays.stream(cookies)
                              .filter(c -> c.getName().equals("refreshToken"))
                              .findFirst()
                              .orElse(new Cookie("refreshToken", null));

        return cookie.getValue();
    }
}