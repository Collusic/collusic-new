package com.collusic.collusicbe.domain.track;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.global.exception.ForbiddenException;
import com.collusic.collusicbe.service.S3Service;
import com.collusic.collusicbe.service.TrackService;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.TrackUpdateRequestDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("TestService Unit Test")
public class TrackServiceTest {

    private TrackService trackService;
    private TrackRepository trackRepository;
    private ProjectRepository projectRepository;
    private S3Service s3Service;

    private Member testMember;
    private Project testProject;
    private Track testTrack;

    @BeforeEach
    void setUp() {
        trackRepository = mock(TrackRepository.class);
        projectRepository = mock(ProjectRepository.class);
        s3Service = mock(S3Service.class);
        trackService = new TrackService(projectRepository, trackRepository, s3Service);

        testMember = Member.builder()
                           .id(1L)
                           .nickname("testMember")
                           .build();
        testProject = Project.builder()
                             .id(1L)
                             .build();
        testTrack = Track.builder()
                         .id(1L)
                         .creator(testMember)
                         .project(testProject)
                         .trackName("test track name")
                         .fileUrl("test_audio_url")
                         .trackTag(TrackTag.PIANO)
                         .build();
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 정상적인 생성")
    void testCreateTrack() throws IOException {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();

        // when
        when(trackRepository.save(any(Track.class))).thenReturn(testTrack);
        when(s3Service.uploadAudioFile(any(MultipartFile.class))).thenReturn("test_audio_url");

        Track savedTrack = trackService.create(testMember, testProject, requestDto, new MockMultipartFile("test", new byte[]{}));

        //then
        assertThat(savedTrack.getCreator().getNickname()).isEqualTo(testMember.getNickname());
        assertThat(savedTrack.getProject().getId()).isEqualTo(testProject.getId());
        assertThat(savedTrack.getTrackName()).isEqualTo(testTrack.getTrackName());
        assertThat(savedTrack.getTrackTag()).isEqualTo(testTrack.getTrackTag());
        assertThat(savedTrack.getFileUrl()).isEqualTo("test_audio_url");
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 프로젝트에 이미 10개의 트랙이 포함되어 있는 경우 생성 실패(throw IllegalStateException)")
    void testCreateTrack_when_already_over_size_then_throw_exception() {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag("피아노")
                                                                .build();

        // when
        Project projectWithFullTrack = Project.builder().build();

        for (int i = 0; i < 10; i++) {
            projectWithFullTrack.addTrack(Track.builder().build());
        }

        // then
        assertThrows(IllegalStateException.class, () -> trackService.create(testMember, projectWithFullTrack, requestDto, new MockMultipartFile("test", new byte[]{})));
    }

    @Test
    @DisplayName("트랙 수정 테스트 - 정상적인 수정")
    void testUpdateTrack() {
        // given
        TrackUpdateRequestDto requestDto = TrackUpdateRequestDto.builder().trackName("updated test track name").trackTag("드럼").build();
        Track originalTrack = testTrack;

        Track updatedTrack = Track.builder()
                                  .creator(testMember)
                                  .project(testProject)
                                  .trackName("updated test track name")
                                  .trackTag(TrackTag.DRUM)
                                  .build();

        // when
        when(trackRepository.findById(any(Long.class))).thenReturn(Optional.of(originalTrack));
        when(trackRepository.save(any(Track.class))).thenReturn(updatedTrack);
        Track savedTrack = trackService.update(testMember, 1L, requestDto);

        //then
        assertThat(savedTrack.getTrackName()).isEqualTo(requestDto.getTrackName());
        assertThat(savedTrack.getTrackTag()).isEqualTo(requestDto.getTrackTag());
    }

    @Test
    @DisplayName("트랙 수정 테스트 - 트랙 생성자가 아닌 사용자의 요청의 경우 실패")
    void testUpdateTrack_when_other_try_update_than_throw_exception() {
        // given
        TrackUpdateRequestDto requestDto = TrackUpdateRequestDto.builder()
                                                                .trackName("updated test track name")
                                                                .trackTag("드럼")
                                                                .build();
        Track originalTrack = testTrack;
        Track updatedTrack = Track.builder()
                                  .creator(testMember)
                                  .project(testProject)
                                  .trackName("updated test track name")
                                  .trackTag(TrackTag.DRUM)
                                  .build();

        Member anotherMember = Member.builder().id(2L).nickname("otherMember").build();

        // when
        when(trackRepository.findById(any(Long.class))).thenReturn(Optional.of(originalTrack));
        when(trackRepository.save(any(Track.class))).thenReturn(updatedTrack);

        //then
        assertThrows(IllegalArgumentException.class, () -> trackService.update(anotherMember, 1l, requestDto));
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 정상적인 삭제")
    void testDeleteTrack() {
        Project projectWithTracks = Project.builder().build();

        for (int i = 2; i <= 6; i++) {
            projectWithTracks.addTrack(Track.builder().id((long) i).orderInProject(i - 1).creator(testMember).build());
        }

        projectWithTracks.addTrack(testTrack);

        when(trackRepository.findById(any(Long.class))).thenReturn(Optional.of(testTrack));
        doNothing().when(trackRepository).delete(any(Track.class));

        List<Track> tracksFromProject = projectWithTracks.getTracks();
        assertThat(tracksFromProject.size()).isEqualTo(6);

        trackService.delete(testMember, projectWithTracks, 1L);

        verify(trackRepository, times(1)).delete(any(Track.class));
        assertThat(tracksFromProject.size()).isEqualTo(5);
        assertThat(tracksFromProject.stream().filter(t -> t.getId().equals(testTrack.getId())).count()).isEqualTo(0);

        for (int i = 0; i < tracksFromProject.size(); i++) {
            assertThat(tracksFromProject.get(i).getOrderInProject() == i).isTrue();
        }
    }

    @Test
    @DisplayName("트랙 삭제 테스트 - 삭제하는 트랙이 본인이 생성한 트랙이 아닌 경우 실패")
    void testDeleteTrack_when_not_track_creator_then_throw_exception() {
        testProject.addTrack(testTrack);

        Member anotherMember = Member.builder().id(2L).nickname("anotherMember").build();

        when(trackRepository.findById(any(Long.class))).thenReturn(Optional.of(testTrack));
        doThrow(IllegalStateException.class).when(trackRepository).delete(any(Track.class));

        assertThrows(ForbiddenException.class, () -> trackService.delete(anotherMember, testProject, 1L));
    }
}
