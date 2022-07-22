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
    private SnsType snsType;

    public SignUpRequestDto(String email, String authId, String nickName, String snsType) {
        this.email = email;
        this.authId = authId;
        this.nickName = nickName;
        this.snsType = SnsType.valueOf(snsType);
    }

    public Member toEntity() {
        return Member.builder()
                     .authId(authId)
                     .email(email)
                     .nickname(nickName)
                     .snsType(snsType)
                     .role(Role.USER)
                     .build();
    }
}