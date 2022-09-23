package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.global.exception.jwt.AbnormalAccessException;
import com.collusic.collusicbe.service.TokenService;
import com.collusic.collusicbe.util.JWTUtil;
import com.collusic.collusicbe.util.ParsingUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
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
import java.util.NoSuchElementException;
import java.util.Set;

public class JWTAuthenticationFilter extends BasicAuthenticationFilter {

    private final static String BEARER_PREFIX = "Bearer ";

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    private final ObjectMapper objectMapper;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, TokenService tokenService, ObjectMapper objectMapper) {
        super(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String bearer = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (bearer == null || !bearer.startsWith(BEARER_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String token = bearer.substring(BEARER_PREFIX.length());

        try {
            JWTAuthenticationToken authenticationToken = new JWTAuthenticationToken(token, Set.of(new SimpleGrantedAuthority(JWTUtil.getRole(token)))); // TODO: JWT 형식이 아닌 토큰이 들어왔을 때 예외가 예상되는 부분. 해결이 필요함.
            Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext()
                                 .setAuthentication(authentication);

            chain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            token = reissueAccessToken(request, response);

            JWTAuthenticationToken authenticationToken = new JWTAuthenticationToken(token, Set.of(new SimpleGrantedAuthority(JWTUtil.getRole(token)))); // TODO: JWT 형식이 아닌 토큰이 들어왔을 때 예외가 예상되는 부분. 해결이 필요함.
            Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext()
                                 .setAuthentication(authentication);

            chain.doFilter(request, response);
        }
    }

    private String reissueAccessToken(HttpServletRequest request, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();

        Cookie cookie = Arrays.stream(cookies)
                              .filter(c -> c.getName().equals("refreshToken"))
                              .findFirst()
                              .orElseThrow(NoSuchElementException::new); // TODO : NoSuch에 대한 예외 처리하기

        String refreshToken = cookie.getValue();

        try {
            JWTUtil.verify(refreshToken);

            String accessToken = tokenService.reissueAccessToken(refreshToken, ParsingUtil.getRemoteAddress(request));
            response.setHeader("Authorization", BEARER_PREFIX + accessToken);

            return accessToken;
        } catch (ExpiredJwtException | EntityNotFoundException e) {
            throw e;
        } catch (AbnormalAccessException e) {
            tokenService.deleteRefreshToken(refreshToken);
            throw e;
        }

    }
}