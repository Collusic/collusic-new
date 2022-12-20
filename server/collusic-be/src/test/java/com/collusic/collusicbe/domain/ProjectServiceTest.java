package com.collusic.collusicbe.domain;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.LikeRepository;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackTag;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.service.TrackService;
import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.TrackCreateRequestDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DisplayName("ProjectService Unit Test")
@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {

    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private TrackService trackService;

    @Mock
    private LikeRepository likeRepository;

    private Member testMember;
    private Project testProject;
    private Track testTrack;

    @BeforeEach
    void setUp() {
        testMember = Member.builder()
                           .id(1L)
                           .nickname("testMember")
                           .build();
        testProject = Project.builder()
                             .id(1L)
                             .projectName("test project name")
                             .bpm(45)
                             .build();

        testProject.setModifiedDate(LocalDateTime.now());

        testTrack = Track.builder()
                         .id(1L)
                         .creator(testMember)
                         .project(testProject)
                         .trackName("test track name")
                         .trackTag(TrackTag.PIANO)
                         .build();

        testProject.addTrack(testTrack);
    }

    @Test
    @DisplayName("프로젝트 생성 테스트 - 정상적인 생성")
    void testCreateProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("test project name")
                                                                    .bpm(45)
                                                                    .trackTag("피아노")
                                                                    .build();

        // when
        when(projectRepository.save(any(Project.class))).thenReturn(testProject);
        when(trackService.create(any(Member.class), any(Project.class), any(TrackCreateRequestDto.class), any(MultipartFile.class))).thenReturn(testTrack);

        Project savedProject = projectService.createProject(testMember, requestDto, makeMockMultipartFile());

        // then
        assertThat(savedProject.getProjectName()).isEqualTo(testProject.getProjectName());
        assertThat(savedProject.getBpm()).isEqualTo(testProject.getBpm());
        assertThat(savedProject.getTracks().get(0)).isEqualTo(testTrack);
    }

    @Test
    @DisplayName("프로젝트 목록 보기 테스트 - 프로젝트가 1개 존재할 경우 첫 페이지의 프로젝트 개수는 1개이고, 다음 페이지 '없음' 상태를 반환한다.")
    void testProjectPagination() {
        // given
        List<Project> projects = new ArrayList<>();
        projects.add(testProject);
        Pageable pageable = (Pageable) PageRequest.of(0, 12);

        Slice<Project> slice = new SliceImpl<>(projects, pageable, false);

        // when
        when(projectRepository.findById(any(Long.class))).thenReturn(Optional.of(testProject));
        when(projectRepository.findAllByOrderByModifiedDate(any(int.class), any(Long.class), any(LocalDateTime.class))).thenReturn(slice);
        when(likeRepository.countByProjectId(any(Long.class))).thenReturn(0L);
        when(likeRepository.existsByMemberAndProject(any(Member.class), any(Project.class))).thenReturn(false);
        ProjectsResponseDto responseDto = projectService.getProjects(12, testProject.getId(), testMember);

        // then
        assertThat(responseDto.getResponseDtos().size()).isEqualTo(1);
        assertThat(responseDto.isHasNext()).isFalse();
    }

    private MultipartFile makeMockMultipartFile() throws IOException {
        return new MockMultipartFile(
                "audioFile",
                "schoolbell.mp3",
                MediaType.IMAGE_JPEG_VALUE,
                new FileInputStream("src/test/resources/assets/schoolbell.mp3"));
    }
}
