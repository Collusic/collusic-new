package com.collusic.collusicbe.acceptanceTest;

import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Project Acceptance Test")
public class ProjectAcceptanceTest extends AbstractAcceptanceTest {

    @Test
    @DisplayName("프로젝트 생성 테스트 - 정상적인 요청의 경우 CREATED(201)으로 응답")
    void testCreatingProject() {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                .projectName("test project name")
                .bpm(45)
                .trackTag("피아노")
                .build();

        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", requestEntityWithToken(requestDto), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    @DisplayName("프로젝트 생성 테스트 - 로그인하지 않은 사용자의 요청인 경우 UNAUTHORIZED(401)으로 응답")
    void testUnauthorizedCreatingProject() {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("test project name")
                                                                    .bpm(45)
                                                                    .trackTag("피아노")
                                                                    .build();

        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", requestEntity(requestDto), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("프로젝트 생성 테스트 - 필수 데이터가 누락된 요청인 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestCreatingProject() {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .build();

        // when
        ResponseEntity<ProjectCreateResponseDto> response = template().postForEntity("/projects", requestEntityWithToken(requestDto), ProjectCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("프로젝트 목록 보기 테스트 - 등록된 사용자/방문자로서, 프로젝트에 대한 목록을 16개씩 확인할 수 있다.")
    void test12ProjectsShowingProjectList() {
        // given
        int elementSize = 16;

        // when
        ProjectsResponseDto response = template().getForObject("/projects", ProjectsResponseDto.class);

        // then
        assertThat(response.getResponseDtos().size()).isEqualTo(elementSize);
    }

    @Test
    @DisplayName("프로젝트 좋아요 테스트 - 등록된 사용자로서, 나는 프로젝트에 대해 좋아요를 누를 수 있다.")
    void testLikeAction() {
        // when
        ResponseEntity<LikeResponseDto> response = template().postForEntity("/projects/2/like", requestEntityWithToken(null), LikeResponseDto.class);

        // then
        assertThat(response.getBody().getIsLiked()).isTrue();
    }

    @Test
    @DisplayName("프로젝트 좋아요 취소 테스트 - 등록된 사용자로서, 나는 좋아요를 취소할 수 있다.")
    void testLikeActionCancel() {
        // when
        ResponseEntity<LikeResponseDto> response = template().postForEntity("/projects/13/like", requestEntityWithToken(null), LikeResponseDto.class);

        // then
        assertThat(response.getBody().getIsLiked()).isFalse();
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
        ResponseEntity<Void> response = template().exchange("/projects/5", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
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

//    @Test
//    @DisplayName("프로젝트 수정 실패 테스트 - 프로젝트 생성자는 트랙이 이미 삭제된 경우, 프로젝트 수정이 불가능하다.")
//    void testProjectUpdateFail() {
//        // given
//        ProjectUpdateRequestDto requestDto = ProjectUpdateRequestDto.builder()
//                                                                    .projectName("update project name")
//                                                                    .trackTag("드럼")
//                                                                    .build();
//
//        // when
//        ResponseEntity<ProjectUpdateResponseDto> response = template().exchange("/projects/15", HttpMethod.PUT, requestEntityWithToken(requestDto), ProjectUpdateResponseDto.class);
//
//        // then
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
//    }
}