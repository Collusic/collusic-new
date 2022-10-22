package com.collusic.collusicbe.acceptanceTest;

import com.collusic.collusicbe.domain.track.TrackRepository;
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
                                                                .editable(true)
                                                                .measure(4)
                                                                .volume(50)
                                                                .build();

        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/1/tracks", requestEntityWithToken(requestDto), TrackCreateResponseDto.class);

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
                                                                .editable(true)
                                                                .measure(4)
                                                                .volume(50)
                                                                .build();

        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/1/tracks", requestEntity(requestDto), TrackCreateResponseDto.class);

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
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/1/tracks", requestEntityWithToken(emptyDto), TrackCreateResponseDto.class);

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
                                                                .measure(4)
                                                                .editable(true)
                                                                .volume(50)
                                                                .build();
        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/2/tracks", requestEntityWithToken(requestDto), TrackCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 수정 테스트 - 정상적인 요청의 경우 OK(200)으로 응답")
    void testUpdatingTrack() {
        // given
        TrackUpdateRequestDto requestDto = TrackUpdateRequestDto.builder()
                                                                .projectId(3L)
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .editable(true)
                                                                .measure(4)
                                                                .volume(50)
                                                                .build();

        // when
        ResponseEntity<Void> response = template().exchange("/tracks/12", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

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
        ResponseEntity<Void> response = template().exchange("/tracks/12", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 수정 테스트 - 해당 트랙이 속한 프로젝트의 마지막 프로젝트가 아닌 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestUpdatingTrack_when_not_last_track_in_project() {
        // given
        TrackUpdateRequestDto requestDto = TrackUpdateRequestDto.builder()
                                                                .projectId(3L)
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .editable(true)
                                                                .measure(4)
                                                                .volume(50)
                                                                .build();

        // when
        ResponseEntity<Void> response = template().exchange("/tracks/11", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 정상적인 요청의 경우 OK(200)으로 응답")
    void testDeletingTrack() {
        // TODO
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 정상적인 요청의 경우 OK(200)으로 응답 + 프로젝트의 루트 트랙인 경우 프로젝트도 삭제되어야 함")
    void testDeletingTrack2() {
        // TODO
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 현재 사용자가 등록하지 않은 트랙을 삭제 요청하는 경우 FORBIDDEN(403)으로 응답")
    void testBadRequestDeletingTrack() {
        // TODO
    }
}