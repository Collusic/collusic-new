package com.collusic.collusicbe.config.auth;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.domain.member.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration()
                                           .getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                                                  .getProviderDetails()
                                                  .getUserInfoEndpoint()
                                                  .getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Optional<Member> member = memberRepository.findByEmail(attributes.getEmail());

        if (!member.isPresent()) {
            return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(Role.GUEST.getKey())), oAuth2User.getAttributes(), userNameAttributeName);
        }

        return oAuth2User(member.get(), attributes, oAuth2User, userNameAttributeName);
        // 회원가입 상황
        // a. 가입된 적이 없는 이메일이 들어옴
        // - attemptAuthentication에서 authenticationResult를 반환
        // - successfulAuthentication에서 oauth 정보를 response에 담아서 보냄
        // b. 다른 sns타입으로 가입된 이메일이 존재 시
        // - customOauth2UserService의 loadUser()에서 EXISTED_USER 권한을 갖게 한 후 반환.
        // - OAuth2AuthenticationPrincipal을 상속 받은 클래스에서 authentication의 authority가 existed_user라면 AuthenticationException을 날림
        // 로그인 상황
        // - successfulAuthentication에서 JWT 담아서 보냄

        // 시스템 상 사용자 USER
        // 시스템에 없는 사용자 GUEST
        // 시스템에 있는데 sns타입 다른 사용자 EXISTED_USER
    }

    private OAuth2User oAuth2User(Member member, OAuthAttributes attributes, OAuth2User oAuth2User, String userNameAttributeName) {
        if (validateUserAttributes(member, attributes)) {
            return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(Role.USER.getKey())), oAuth2User.getAttributes(), userNameAttributeName);
        }

        return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(Role.EXISTED_USER.getKey())), oAuth2User.getAttributes(), userNameAttributeName);
    }

    private boolean validateUserAttributes(Member member, OAuthAttributes attributes) {
        return member.isSameSnsType(attributes.getSnsType());
    }
}