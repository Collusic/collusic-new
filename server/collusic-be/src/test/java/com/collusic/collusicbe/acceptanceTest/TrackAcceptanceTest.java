package com.collusic.collusicbe.acceptanceTest;

import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.web.controller.dto.ProjectResponseDto;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.TrackCreateResponseDto;
import com.collusic.collusicbe.web.controller.dto.TrackUpdateRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Track Acceptance Test")
public class TrackAcceptanceTest extends AbstractAcceptanceTest {

    @Autowired
    private TrackRepository trackRepository;

    @Test
    @DisplayName("트랙 생성 테스트 - 정상적인 요청의 경우 CREATED(201)으로 응답")
    void testCreatingTrack() {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();

        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/247f720a-3eb6-4ba4-9dc9-9f5bde8014a3/tracks", requestEntityWithToken(requestDto), TrackCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 로그인하지 않은 사용자의 요청인 경우 UNAUTHORIZED(401)으로 응답")
    void testUnauthorizedCreatingTrack() {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();

        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/247f720a-3eb6-4ba4-9dc9-9f5bde8014a3/tracks", requestEntity(requestDto), TrackCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 필수 데이터가 누락된 요청인 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestCreatingTrack() {
        // given
        TrackCreateRequestDto emptyDto = TrackCreateRequestDto.builder()
                                                              .build();

        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/247f720a-3eb6-4ba4-9dc9-9f5bde8014a3/tracks", requestEntityWithToken(emptyDto), TrackCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 프로젝트에 더이상 트랙을 등록할 수 없을 때의 요청의 경우 BAD_REQUEST(400)으로 응답")
    void testForbiddenCreatingTrack() {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();
        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/e51933e5-1104-4302-905f-7a7629f5bf02/tracks", requestEntityWithToken(requestDto), TrackCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 수정 테스트 - 정상적인 요청의 경우 OK(200)으로 응답")
    void testUpdatingTrack() {
        // given
        TrackUpdateRequestDto requestDto = TrackUpdateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();

        // when
        ResponseEntity<Void> response = template().exchange("/projects/a7fdca9b-23e1-4533-a3c5-8beeb28fb66b/tracks/12", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("트랙 수정 테스트 - 비정상적인 요청의 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestUpdatingTrack() {
        // given
        TrackUpdateRequestDto requestDto = TrackUpdateRequestDto.builder()
                                                                .build();

        // when
        ResponseEntity<Void> response = template().exchange("/projects/a7fdca9b-23e1-4533-a3c5-8beeb28fb66b/tracks/12", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 수정 테스트 - 해당 트랙이 속한 프로젝트의 마지막 프로젝트가 아닌 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestUpdatingTrack_when_not_last_track_in_project() {
        // given
        TrackUpdateRequestDto requestDto = TrackUpdateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();

        // when
        ResponseEntity<Void> response = template().exchange("/projects/a7fdca9b-23e1-4533-a3c5-8beeb28fb66b/tracks/11", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 정상적인 요청의 경우 OK(200)으로 응답")
    void testDeletingTrack() {
        ResponseEntity<Void> response = template().exchange("/projects/721da6c6-cf51-4000-9853-754b2a2ac193/tracks/13", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 정상적인 요청의 경우 OK(200)으로 응답 + 프로젝트의 루트 트랙인 경우 프로젝트도 삭제되어야 함")
    void testDeletingTrack2() {
        ResponseEntity<Void> responseForDeleting = template().exchange("/projects/adf231b2-fe97-4034-8517-1c4a0f3ba742/tracks/15", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);
        assertThat(responseForDeleting.getStatusCode()).isEqualTo(HttpStatus.OK);

        ResponseEntity<ProjectResponseDto> responseForCheckingDeleted = template().getForEntity("/projects/adf231b2-fe97-4034-8517-1c4a0f3ba742", ProjectResponseDto.class);
        assertThat(responseForCheckingDeleted.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 현재 사용자가 등록하지 않은 트랙을 삭제 요청하는 경우 FORBIDDEN(403)으로 응답")
    void testBadRequestDeletingTrack() {
        ResponseEntity<Void> response = template().exchange("/projects/721da6c6-cf51-4000-9853-754b2a2ac193/tracks/14", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }
}
