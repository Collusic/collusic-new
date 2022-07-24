package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.util.JWTUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

    private final AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String bearer = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (bearer == null || !bearer.startsWith(BEARER_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String token = bearer.substring(BEARER_PREFIX.length());

        JWTAuthenticationToken authenticationToken = new JWTAuthenticationToken(token, Set.of(new SimpleGrantedAuthority(JWTUtil.getRole(token)))); // TODO: JWT 형식이 아닌 토큰이 들어왔을 때 예외가 예상되는 부분. 해결이 필요함.
        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext()
                             .setAuthentication(authentication);

        chain.doFilter(request, response);
    }
}
