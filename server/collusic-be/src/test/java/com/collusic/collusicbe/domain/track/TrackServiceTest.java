package com.collusic.collusicbe.domain.track;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.service.TrackService;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayName("TestService Unit Test")
public class TrackServiceTest {

    private TrackService trackService;
    private TrackRepository trackRepository;

    private Member testMember;
    private Project testProject;

    @BeforeEach
    void setUp() {
        trackRepository = mock(TrackRepository.class);
        trackService = new TrackService(trackRepository);

        testMember = Member.builder()
                           .nickname("testMember")
                           .build();

        testProject = Project.builder()
                             .id(1L)
                             .tracks(new ArrayList<>())
                             .build();
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 정상적인 생성")
    void testCreateTrack() {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag(TrackTag.valueOf("PIANO"))
                                                                .editable(true)
                                                                .volume(50)
                                                                .build();
        Track track = Track.builder()
                           .creator(testMember)
                           .project(testProject)
                           .trackName("test track name")
                           .trackTag(TrackTag.PIANO)
                           .editable(true)
                           .volume(50)
                           .build();

        // when
        when(trackRepository.save(any(Track.class))).thenReturn(track);
        Track savedTrack = trackService.create(testMember, testProject, requestDto);

        //then
        assertThat(savedTrack.getCreator().getNickname()).isEqualTo(testMember.getNickname());
        assertThat(savedTrack.getProject().getId()).isEqualTo(testProject.getId());
        assertThat(savedTrack.getTrackName()).isEqualTo(track.getTrackName());
        assertThat(savedTrack.getTrackTag()).isEqualTo(track.getTrackTag());
        assertThat(savedTrack.isEditable()).isEqualTo(track.isEditable());
        assertThat(savedTrack.getVolume()).isEqualTo(track.getVolume());
    }

    @Test
    @DisplayName("트랙 생성 테스트 - 프로젝트에 이미 10개의 트랙이 포함되어 있는 경우 생성 실패")
    void testCreateTrack_when_already_over_size_then_throw_exception() {
        // given
        TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                .trackName("test track name")
                                                                .trackTag(TrackTag.valueOf("PIANO"))
                                                                .editable(true)
                                                                .volume(50)
                                                                .build();

        // when
        List<Track> tempTracks = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            tempTracks.add(Track.builder().build());
        }
        Project projectWithFullTrack = Project.builder()
                                              .tracks(tempTracks)
                                              .build();

        // then
        assertThrows(RuntimeException.class, () -> trackService.create(testMember, projectWithFullTrack, requestDto));
    }
}
