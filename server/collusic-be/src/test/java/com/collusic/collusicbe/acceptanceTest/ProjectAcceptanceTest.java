package com.collusic.collusicbe.acceptanceTest;

import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

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
                                                                    .audioFile(getMockMultipartFile())
                                                                    .build();

        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", projectCreateRequestEntity(requestDto, testToken()), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    @DisplayName("프로젝트 생성 실패 테스트 - 로그인하지 않은 사용자의 요청인 경우 UNAUTHORIZED(401)으로 응답")
    void testUnauthorizedCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("test project name")
                                                                    .bpm(45)
                                                                    .trackTag("피아노")
                                                                    .audioFile(getMockMultipartFile())
                                                                    .build();

        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", projectCreateRequestEntity(requestDto, null), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("프로젝트 생성 실패 테스트 - 필수 데이터가 누락된 요청인 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .trackTag("피아노")
                                                                    .audioFile(getMockMultipartFile())
                                                                    .build();
        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", projectCreateRequestEntity(requestDto, testToken()), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("프로젝트 생성 실패 테스트 - 프로젝트 명이 21자일 경우 BAD_REQUEST(400)와 에러 메시지(프로젝트 명은 1자 이상 20자 이내로 한다)를 응답한다.")
    void testBadRequestAndProjectNameErrorMessageCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("project name length is over twenty")
                                                                    .bpm(45)
                                                                    .trackTag("피아노")
                                                                    .audioFile(getMockMultipartFile())
                                                                    .build();
        // when
        ResponseEntity<String> response = template().postForEntity("/projects", projectCreateRequestEntity(requestDto, testToken()), String.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).contains("프로젝트 명은 1자 이상 20자 이내로 한다.");
    }

    @Test
    @DisplayName("프로젝트 생성 실패 테스트 - 프로젝트 bpm이 29일 경우 BAD_REQUEST(400)와 에러 메시지(BPM의 범위는 30부터 240까지 설정할 수 있다)를 응답한다.")
    void testBadRequestAndBpmUnderErrorMessageCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("project name length is over twenty")
                                                                    .bpm(29)
                                                                    .trackTag("피아노")
                                                                    .audioFile(getMockMultipartFile())
                                                                    .build();
        // when
        ResponseEntity<String> response = template().postForEntity("/projects", projectCreateRequestEntity(requestDto, testToken()), String.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).contains("BPM의 범위는 30부터 240까지 설정할 수 있다.");
    }

    @Test
    @DisplayName("프로젝트 생성 실패 테스트 - 프로젝트 bpm이 241일 경우 BAD_REQUEST(400)와 에러 메시지(BPM의 범위는 30부터 240까지 설정할 수 있다)를 응답한다.")
    void testBadRequestAndBpmOverErrorMessageCreatingProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("project name length is over twenty")
                                                                    .bpm(241)
                                                                    .trackTag("피아노")
                                                                    .audioFile(getMockMultipartFile())
                                                                    .build();
        // when
        ResponseEntity<String> response = template().postForEntity("/projects", projectCreateRequestEntity(requestDto, testToken()), String.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).contains("BPM의 범위는 30부터 240까지 설정할 수 있다.");
    }

    @Test
    @DisplayName("프로젝트 목록 보기 테스트 - 등록된 사용자/방문자로서, OK(200) 응답과 프로젝트에 대한 목록을 24개씩 확인할 수 있다.")
    void test24ProjectsShowingProjectList() {
        // given
        int elementSize = 24;

        // when
        ResponseEntity<ProjectsResponseDto> response = template().getForEntity("/projects", ProjectsResponseDto.class);

        // then
        assertThat(response.getBody().getResponseDtos().size()).isEqualTo(elementSize);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("프로젝트 좋아요 테스트 - 등록된 사용자로서, 나는 프로젝트에 대해 좋아요를 누르면 좋아요의 색깔이 true가 된다.")
    void testLikeColorIsTrueWhenLike() {
        // when
        ResponseEntity<LikeResponseDto> response = template().postForEntity("/projects/2/like", requestEntityWithToken(null), LikeResponseDto.class);

        // then
        assertThat(response.getBody().getIsLiked()).isTrue();
    }

    @Test
    @DisplayName("프로젝트 좋아요 취소 테스트 - 등록된 사용자로서, 나는 프로젝트에 대해 좋아요를 취소하면 좋아요의 색깔이 false가 된다.")
    void testLikeColorIsFalseWhenLikeCancel() {
        // when
        ResponseEntity<LikeResponseDto> response = template().postForEntity("/projects/13/like", requestEntityWithToken(null), LikeResponseDto.class);

        // then
        assertThat(response.getBody().getIsLiked()).isFalse();
    }

    @Test
    @DisplayName("프로젝트 좋아요 실패 테스트 - 로그인하지 않은 사용자의 좋아요 요청인 경우 UNAUTHORIZED(401)으로 응답")
    void testUnAuthorizedWhenNotRegisteredUserLikeAction() {
        // when
        ResponseEntity<String> response = template().postForEntity("/projects/13/like", requestEntity(null), String.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("프로젝트 삭제 테스트 - 프로젝트에 본인이 등록한 트랙만 존재하는 경우, 프로젝트를 완전히 삭제할 수 있다.")
    void testProjectDelete() {
        // when
        ResponseEntity<Void> response = template().exchange("/projects/10", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    @DisplayName("프로젝트 삭제 실패 테스트 - 프로젝트에 타인이 생성한 트랙이 존재하는 경우, 프로젝트를 삭제할 수 없다.")
    void testProjectDeleteFail() {
        // when
        ResponseEntity<String> response = template().exchange("/projects/5", HttpMethod.DELETE, requestEntityWithToken(null), String.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).contains("다른 사용자의 트랙이 있는 경우, 프로젝트를 삭제할 수 없습니다.");
    }

    @Test
    @DisplayName("프로젝트 수정 테스트 - 프로젝트 생성자는 프로젝트의 루트 트랙이 UNKNOWN 상태가 아닐 경우, 프로젝트 수정이 가능하다.")
    void testProjectUpdate() {
        // given
        ProjectUpdateRequestDto requestDto = ProjectUpdateRequestDto.builder()
                                                                    .projectName("update project name")
                                                                    .trackTag("드럼")
                                                                    .build();


        // when
        ResponseEntity<ProjectUpdateResponseDto> response = template().exchange("/projects/16", HttpMethod.PUT, requestEntityWithToken(requestDto), ProjectUpdateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("프로젝트 수정 실패 테스트 - 프로젝트 생성자는 트랙이 이미 삭제된 경우, 프로젝트 수정이 불가능하다.")
    void testProjectUpdateFail() {
        // given
        ProjectUpdateRequestDto requestDto = ProjectUpdateRequestDto.builder()
                                                                    .projectName("update project")
                                                                    .trackTag("피아노")
                                                                    .build();

        // when
        ResponseEntity<String> response = template().exchange("/projects/15", HttpMethod.PUT, requestEntityWithToken(requestDto), String.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    @DisplayName("프로젝트 수정 실패 테스트 - 루트 트랙 생성자와 사용자가 일치하지 않는 경우, 프로젝트 수정이 불가능하다.")
    void testProjectUpdateFailWhenRootTrackUserMismatchUser() {
        // given
        ProjectUpdateRequestDto requestDto = ProjectUpdateRequestDto.builder()
                                                                    .projectName("update project")
                                                                    .trackTag("피아노")
                                                                    .build();

        // when
        ResponseEntity<String> response = template().exchange("/projects/17", HttpMethod.PUT, requestEntityWithToken(requestDto), String.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    @DisplayName("프로젝트 상세 정보 조회 - 등록된 사용자/방문자로서, 프로젝트에 대한 정보(프로젝트명, bpm, 좋아요 개수, 좋아요 여부, 트랙 정보)를 볼 수 있다.")
    void testProjectDetailInfoShow() {
        // when
        ResponseEntity<ProjectResponseDto> response = template().getForEntity("/projects/2", ProjectResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getProjectId()).isEqualTo(2);
    }

    private MultipartFile getMockMultipartFile() throws IOException {
        return new MockMultipartFile(
                "audioFile",
                "schoolbell.mp3",
                MediaType.IMAGE_JPEG_VALUE,
                new FileInputStream("src/test/resources/assets/schoolbell.mp3"));
    }

    private HttpEntity<MultiValueMap<String, Object>> projectCreateRequestEntity(ProjectCreateRequestDto dto, String token) {
        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("projectName", dto.getProjectName());
        multiValueMap.add("bpm", dto.getBpm());
        multiValueMap.add("trackTag", dto.getTrackTag().getLabel());
        multiValueMap.add("audioFile", dto.getAudioFile().getResource());

        HttpHeaders headers = new HttpHeaders();
        if (token != null) {
            headers.setBearerAuth(token);
        }
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        return new HttpEntity<>(multiValueMap, headers);
    }
}