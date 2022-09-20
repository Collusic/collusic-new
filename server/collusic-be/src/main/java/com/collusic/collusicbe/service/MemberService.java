package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.domain.member.ProfileContentType;
import com.collusic.collusicbe.global.exception.DuplicatedNicknameException;
import com.collusic.collusicbe.web.controller.dto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final S3Service s3Service;

    public Member signUp(SignUpRequestDto signUpRequestDto) {
        return memberRepository.save(signUpRequestDto.toEntity());
    }

    public void validateDuplicatedNickname(String nickname) {
        List<Member> members = memberRepository.findMemberByNickname(nickname);

        if (members.size() > 0) {
            throw new DuplicatedNicknameException("닉네임이 중복되었습니다.");
        }
    }

    public Map<String, String> uploadProfile(String nickname, @ModelAttribute MultipartFile multipartFile) throws IOException {
        return s3Service.upload(nickname, multipartFile);
    }

    public void updateProfilePath(Member loginMember, String profilePath) {
        loginMember.updateProfile(profilePath);
    }

    public Optional<Member> findByNickname(String nickname) {
        return memberRepository.findByNickname(nickname);
    }

    public boolean checkProfileValidation(MultipartFile multipartFile) {
        return ProfileContentType.isImageType(multipartFile.getContentType()) && multipartFile.getSize() < 20_000_000;
    }
}