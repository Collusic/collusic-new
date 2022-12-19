package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.global.exception.ParameterEmptyException;
import com.collusic.collusicbe.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Component
public class LoginMemberArgumentResolver implements HandlerMethodArgumentResolver {

    private final static String BEARER_PREFIX = "Bearer ";
    private final static String AUTHORIZATION_HEADER_NOT_FOUND = "Authorization 헤더의 토큰을 확인할 수 없습니다.";

    private final MemberRepository memberRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isLoginMemberAnnotation = parameter.getParameterAnnotation(LoginMember.class) != null;
        boolean isMemberClass = Member.class.equals(parameter.getParameterType());
        return isLoginMemberAnnotation && isMemberClass;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String bearer = webRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if (bearer == null || !bearer.startsWith(BEARER_PREFIX)) {
            throw new ParameterEmptyException(AUTHORIZATION_HEADER_NOT_FOUND);
        }

        String token = bearer.substring(BEARER_PREFIX.length());
        String email = JWTUtil.getEmail(token);
        Member member = memberRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        return member;
    }
}
