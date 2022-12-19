package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
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
public class VisitorArgumentResolver implements HandlerMethodArgumentResolver {

    private final static String BEARER_PREFIX = "Bearer ";

    private final MemberRepository memberRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isVisitorAnnotation = parameter.getParameterAnnotation(Visitor.class) != null;
        boolean isMemberClass = Member.class.equals(parameter.getParameterType());
        return isVisitorAnnotation && isMemberClass;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String bearer = webRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if (bearer == null || !bearer.startsWith(BEARER_PREFIX)) {
            return null;
        }

        String token = bearer.substring(BEARER_PREFIX.length());

        String email = JWTUtil.getEmail(token);
        Member member = memberRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        return member;
    }
}
