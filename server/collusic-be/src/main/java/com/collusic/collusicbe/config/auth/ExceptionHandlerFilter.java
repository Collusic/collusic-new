package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.global.exception.ExceptionInfoResponse;
import com.collusic.collusicbe.global.exception.jwt.AbnormalAccessException;
import com.collusic.collusicbe.global.exception.jwt.ExpiredJwtException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.persistence.EntityNotFoundException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException | AbnormalAccessException | EntityNotFoundException e) {
            sendErrorResponse(HttpStatus.UNAUTHORIZED.value(), response, e);
        }
    }

    private void sendErrorResponse(int status, HttpServletResponse response, RuntimeException e) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setStatus(status);
        response.getWriter().write(objectMapper.writeValueAsString(ExceptionInfoResponse.from(HttpStatus.UNAUTHORIZED.getReasonPhrase(), e.getMessage())));
    }
}