package com.collusic.collusicbe.acceptanceTest;

import com.collusic.collusicbe.service.S3Service;
import com.collusic.collusicbe.web.controller.dto.ProjectResponseDto;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.TrackCreateResponseDto;
import com.collusic.collusicbe.web.controller.dto.TrackUpdateRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DisplayName("Track Acceptance Test")
public class TrackAcceptanceTest extends AbstractAcceptanceTest {

    @MockBean
    private S3Service s3Service;

    @Test
    @DisplayName("트랙 생성 테스트 - 정상적인 요청의 경우 CREATED(201)으로 응답")
    void testCreatingTrack() throws IOException {
        // given
        TrackCreateRequestDto trackCreateRequestDto = TrackCreateRequestDto.builder()
                                                                           .trackName("test track name")
                                                                           .trackTag("피아노")
                                                                           .build();

        when(s3Service.uploadAudioFile(any(MultipartFile.class))).thenReturn("test_audio_url");

        // when
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/1/tracks", trackCreateRequestEntity(trackCreateRequestDto), TrackCreateResponseDto.class);

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
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/1/tracks", requestEntity(requestDto), TrackCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 필수 데이터가 누락된 요청인 경우 BAD_REQUEST(400)으로 응답")
    void testBadRequestCreatingTrack() throws IOException {
        // given
        TrackCreateRequestDto emptyDto = TrackCreateRequestDto.builder()
                                                              .build();

        // when
        when(s3Service.uploadAudioFile(any(MultipartFile.class))).thenReturn("test_audio_url");
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/1/tracks", trackCreateRequestEntity(emptyDto), TrackCreateResponseDto.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 프로젝트에 더이상 트랙을 등록할 수 없을 때의 요청의 경우 BAD_REQUEST(400)으로 응답")
    void testForbiddenCreatingTrack() throws IOException {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();
        // when
        when(s3Service.uploadAudioFile(any(MultipartFile.class))).thenReturn("test_audio_url");
        ResponseEntity<TrackCreateResponseDto> response = template().postForEntity("/projects/2/tracks", trackCreateRequestEntity(requestDto), TrackCreateResponseDto.class);

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
        ResponseEntity<Void> response = template().exchange("/projects/3/tracks/12", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

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
        ResponseEntity<Void> response = template().exchange("/projects/3/tracks/12", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

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
        ResponseEntity<Void> response = template().exchange("/projects/3/tracks/11", HttpMethod.PUT, requestEntityWithToken(requestDto), Void.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 정상적인 요청의 경우 OK(200)으로 응답")
    void testDeletingTrack() {
        ResponseEntity<Void> response = template().exchange("/projects/4/tracks/13", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 정상적인 요청의 경우 OK(200)으로 응답 + 프로젝트의 루트 트랙인 경우 프로젝트도 삭제되어야 함")
    void testDeletingTrack2() {
        ResponseEntity<Void> responseForDeleting = template().exchange("/projects/5/tracks/15", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);
        assertThat(responseForDeleting.getStatusCode()).isEqualTo(HttpStatus.OK);

        ResponseEntity<ProjectResponseDto> responseForCheckingDeleted = template().getForEntity("/projects/5", ProjectResponseDto.class);
        assertThat(responseForCheckingDeleted.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 현재 사용자가 등록하지 않은 트랙을 삭제 요청하는 경우 FORBIDDEN(403)으로 응답")
    void testBadRequestDeletingTrack() {
        ResponseEntity<Void> response = template().exchange("/projects/4/tracks/14", HttpMethod.DELETE, requestEntityWithToken(null), Void.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    private HttpEntity<MultiValueMap<String, Object>> trackCreateRequestEntity(TrackCreateRequestDto dto) throws IOException {
        MockMultipartFile multipartFile = new MockMultipartFile(
                "audioFile",
                "schoolbell.mp3",
                MediaType.IMAGE_JPEG_VALUE,
                new FileInputStream("src/test/resources/assets/schoolbell.mp3"));

        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("audioFile", multipartFile.getResource());

        multiValueMap.add("trackCreateRequest", dto);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(testToken());
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);


        return new HttpEntity<>(multiValueMap, headers);
    }
}
