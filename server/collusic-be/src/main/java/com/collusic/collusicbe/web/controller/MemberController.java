package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.service.MemberService;
import com.collusic.collusicbe.service.TokenService;
import com.collusic.collusicbe.util.ParsingUtil;
import com.collusic.collusicbe.web.auth.OAuth2LoginResponseType;
import com.collusic.collusicbe.web.controller.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.collusic.collusicbe.util.JWTUtil.REFRESH_TIME;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;
    private final TokenService tokenService;

    @Operation(summary = "회원가입", description = "회원정보를 통해 회원가입 후 성공 시 access token, refresh token 응답")
    @PostMapping("/members")
    public ResponseEntity<SignUpResponseDto> signUp(@ModelAttribute @Validated SignUpRequestDto signUpRequestDto, HttpServletRequest request, HttpServletResponse response) { // TODO: validation
        Member member = memberService.signUp(signUpRequestDto);
        TokenResponseDto tokens = tokenService.issue(member.getEmail(), member.getRole().getKey(), ParsingUtil.getRemoteAddress(request));

        SignUpResponseDto responseBody = SignUpResponseDto.builder()
                                                          .responseType(OAuth2LoginResponseType.SIGN_IN)
                                                          .accessToken(tokens.getAccessToken())
                                                          .build();

        response.addCookie(setCookieWithRefreshToken(tokens.getRefreshToken()));

        return ResponseEntity.ok(responseBody);
    }

    @Operation(summary = "닉네임 중복 체크", description = "회원가입 과정 중 닉네임 중복 체크에 대한 결과를 응답")
    @GetMapping("/members/{nickname}")
    public ResponseEntity<NicknameValidationResponseDto> validateDuplicatedNickname(@PathVariable String nickname) {
        memberService.validateDuplicatedNickname(nickname);

        NicknameValidationResponseDto nicknameValidationResponseDto = NicknameValidationResponseDto.builder()
                                                                                                   .status(HttpStatus.OK.value())
                                                                                                   .message("사용 가능한 닉네임입니다.")
                                                                                                   .build();
        return ResponseEntity.ok(nicknameValidationResponseDto);
    }

    @Operation(summary = "회원 프로필 이미지 업로드", description = "회원의 프로필 이미지를 업로드한다. 기존에 존재하는 경우 덮어씀")
    @PostMapping("/members/profile")
    public ResponseEntity<String> uploadMemberProfile(@PathVariable String nickname, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            return ResponseEntity.badRequest().body("선택된 파일이 없습니다.");
        }
        if (!memberService.checkProfileValidation(multipartFile)) {
            return ResponseEntity.badRequest().body("유효하지 않은 이미지 파일입니다. 확장자 및 용량을 확인하세요.");
        }
        Member loginMember = memberService.findByNickname(nickname).orElseThrow(RuntimeException::new);
        String profileFileName = memberService.uploadProfile(nickname, multipartFile);

        memberService.updateProfilePath(loginMember, profileFileName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @Operation
    @GetMapping("/members/{nickname}/profile")
    public ResponseEntity<ProfileUrlResponseDto> getProfileUrl(@PathVariable String nickname, @RequestParam("type") String type) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ProfileUrlResponseDto responseDto = new ProfileUrlResponseDto(memberService.getProfileUrlByNickname(nickname, type));
        return new ResponseEntity<>(responseDto, headers, HttpStatus.OK);
    }


    private Cookie setCookieWithRefreshToken(String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setMaxAge(REFRESH_TIME);
        cookie.setSecure(false); // TODO : HTTPS 적용 시 true로 옵션 변경하기
        cookie.setHttpOnly(true);
        return cookie;
    }
}