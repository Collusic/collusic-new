package com.collusic.collusicbe.acceptanceTest;

import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.LikeResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.FileInputStream;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Project Acceptance Test")
public class ProjectAcceptanceTest extends AbstractAcceptanceTest {

    @Test
    @DisplayName("프로젝트 생성 테스트 - 정상적인 요청의 경우 CREATED(201)으로 응답")
    void testCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                .projectName("test project name")
                .bpm(45)
                .trackTag("피아노")
                .build();

        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", trackCreateRequestEntity(requestDto), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    @DisplayName("프로젝트 생성 테스트 - 로그인하지 않은 사용자의 요청인 경우 UNAUTHORIZED(401)으로 응답")
    void testUnauthorizedCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("test project name")
                                                                    .bpm(45)
                                                                    .trackTag("피아노")
                                                                    .build();

        MockMultipartFile multipartFile = new MockMultipartFile(
                "audioFile",
                "schoolbell.mp3",
                MediaType.IMAGE_JPEG_VALUE,
                new FileInputStream("src/test/resources/assets/schoolbell.mp3"));

        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("audioFile", multipartFile.getResource());

        multiValueMap.add("projectCreateRequest", requestDto);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", new HttpEntity<>(multiValueMap, headers), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("프로젝트 생성 테스트 - 필수 데이터가 누락된 요청인 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .build();
        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", trackCreateRequestEntity(requestDto), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("프로젝트 목록 보기 테스트 - 등록된 사용자/방문자로서, 프로젝트에 대한 목록을 12개씩 확인할 수 있다.")
    void test12ProjectsShowingProjectList() {
        // given
        int elementSize = 12;

        // when
        ProjectsResponseDto responseDto = template().getForObject("/projects?page=0", ProjectsResponseDto.class);

        // then
        assertThat(responseDto.getResponseDtos().size()).isEqualTo(elementSize);
    }

    @Test
    @DisplayName("프로젝트 좋아요 테스트 - 등록된 사용자로서, 나는 프로젝트에 대해 좋아요를 누를 수 있다.")
    void testLikeAction() {
        // when
        ResponseEntity<LikeResponseDto> response = template().postForEntity("/projects/2/like", requestEntityWithToken(null), LikeResponseDto.class);

        // then
        assertThat(response.getBody().getIsColor()).isTrue();
    }

    @Test
    @DisplayName("프로젝트 좋아요 취소 테스트 - 등록된 사용자로서, 나는 좋아요를 취소할 수 있다.")
    void testLikeActionCancel() {
        // when
        ResponseEntity<LikeResponseDto> response = template().postForEntity("/projects/13/like", requestEntityWithToken(null), LikeResponseDto.class);

        // then
        assertThat(response.getBody().getIsColor()).isFalse();
    }
}