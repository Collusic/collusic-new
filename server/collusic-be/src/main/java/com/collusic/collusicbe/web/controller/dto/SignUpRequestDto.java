package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.Role;
import com.collusic.collusicbe.domain.member.SnsType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Getter
@NoArgsConstructor
public class SignUpRequestDto {

    @Email
    private String email;

    @NotBlank
    private String authId;

    @NotBlank
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]", message = "닉네임에 특수문자를 포함할 수 없습니다.")
    @Size(min = 2, max = 24, message = "닉네임은 2 ~ 24자 이내여야 합니다.")
    private String nickName;

    @NotBlank
    private String profileImageUrl;

    @NotBlank
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