package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.config.SecurityConfig;
import com.collusic.collusicbe.domain.member.Role;
import com.collusic.collusicbe.service.MemberService;
import com.collusic.collusicbe.service.TokenService;
import com.collusic.collusicbe.util.ParsingUtil;
import com.collusic.collusicbe.web.auth.OAuth2LoginResponseType;
import com.collusic.collusicbe.web.controller.dto.SignUpRequestDto;
import com.collusic.collusicbe.web.controller.dto.TokenResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = MemberController.class,
        excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
})
//@AutoConfigureMockMvc(addFilters = false)
//@SpringBootTest
public class HttpRequestTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

//    @MockBean
//    private JWTAuthenticationProvider jwtAuthenticationProvider;
//
//    @MockBean
//    private JWTAuthenticationFilter jwtAuthenticationFilter; // 문제가 발견된 부분 java.lang.IllegalArgumentException: Attribute name must not be null

    @MockBean
    private MemberService memberService;

    @MockBean
    private TokenService tokenService;

    private MockHttpServletRequest request;

    @BeforeEach
    void setUp() {
        request = new MockHttpServletRequest();
    }

    @DisplayName("회원가입 성공 시 로그인 응답 타입을 반환하고 상태코드 200을 반환하는지 테스트")
    @Test
    public void signUp() throws Exception {
        // given
        SignUpRequestDto signUpRequestDto = signUpRequestDto();

        String mockAccessToken = "mockAccessToken";
        String mockRefreshToken = "mockRefreshToken";

        TokenResponseDto tokenResponseDto = new TokenResponseDto(mockAccessToken, mockRefreshToken);

        when(memberService.signUp(any(SignUpRequestDto.class))).thenReturn(signUpRequestDto.toEntity());
        when(tokenService.issue(signUpRequestDto.getEmail(), Role.USER.getKey(), ParsingUtil.getRemoteAddress(request))).thenReturn(tokenResponseDto);

        // when
        ResultActions resultActions = this.mockMvc.perform(post("/members")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("email", "test@gmail.com")
                .param("authId", "testAuthId")
                .param("nickName", "testNickname")
                .param("profileImageUrl", "profileImageUrl")
                .param("snsType", "KAKAO"));

        // then
        resultActions.andDo(print())
                     .andExpect(status().isOk())
                     .andExpect(content().string(containsString(OAuth2LoginResponseType.SIGN_IN.toString())));
    }

    private SignUpRequestDto signUpRequestDto() {
        return SignUpRequestDto.builder()
                               .email("test@gmail.com")
                               .authId("testAuthId")
                               .nickName("testNickname")
                               .profileImageUrl("profileImageUrl")
                               .snsType("KAKAO")
                               .build();
    }

}