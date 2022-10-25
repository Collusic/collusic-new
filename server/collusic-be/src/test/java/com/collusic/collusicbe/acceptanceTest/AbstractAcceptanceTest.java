package com.collusic.collusicbe.acceptanceTest;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("local")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class AbstractAcceptanceTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private MemberRepository memberRepository;

    protected TestRestTemplate template() {
        return restTemplate;
    }

    protected Member testMember() {
        return memberRepository.findById(1L).get();
    }

    protected String testToken() {
        Member member = testMember();
        return JWTUtil.createAccessToken(member.getEmail(), member.getRole().getKey());
    }

    protected HttpEntity<Object> requestEntityWithToken(Object data) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(testToken());
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new HttpEntity<>(data, headers);
    }

    protected HttpEntity<Object> requestEntity(Object data) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new HttpEntity<>(data, headers);
    }
}
