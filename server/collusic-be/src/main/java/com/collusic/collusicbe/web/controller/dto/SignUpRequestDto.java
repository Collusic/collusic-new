package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.Role;
import com.collusic.collusicbe.domain.member.SnsType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpRequestDto {

    private String email;
    private String authId;
    private String nickName;
    private String profileImageUrl;
    private SnsType snsType;

    public SignUpRequestDto(String email, String authId, String nickName, String profileImageUrl, String snsType) {
        this.email = email;
        this.authId = authId;
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
        this.snsType = SnsType.valueOf(snsType);
    }

    public Member toEntity() {
        return Member.builder()
                     .authId(authId)
                     .email(email)
                     .nickname(nickName)
                     .profileImageUrl(profileImageUrl)
                     .snsType(snsType)
                     .role(Role.USER)
                     .build();
    }
}