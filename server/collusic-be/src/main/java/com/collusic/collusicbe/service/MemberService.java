package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.web.controller.dto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public Member signUp(SignUpRequestDto signUpRequestDto) {
        return memberRepository.save(signUpRequestDto.toEntity());
    }

    public boolean isDuplicatedNickname(String nickname) {
        List<Member> members = memberRepository.findMemberByNickname(nickname);

        if (members.size() > 0) {
            return true;
        }

        return false;
    }
}
