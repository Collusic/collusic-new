package com.collusic.collusicbe.domain.project;

import com.collusic.collusicbe.domain.member.Member;
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
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
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
    @DisplayName("프로젝트 생성 테스트 - 프로젝트가 정상적으로 생성되면 프로젝트 이름, bpm, 트랙 정보를 반환한다.")
    void testCreateProject() throws IOException {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("test project name")
                                                                    .bpm(45)
                                                                    .trackTag("피아노")
                                                                    .audioFile(makeMockMultipartFile())
                                                                    .build();

        // when
        when(projectRepository.save(any(Project.class))).thenReturn(testProject);
        when(trackService.create(any(Member.class), any(Project.class), any(TrackCreateRequestDto.class))).thenReturn(testTrack);

        Project savedProject = projectService.createProject(testMember, requestDto);

        // then
        assertThat(savedProject.getProjectName()).isEqualTo(testProject.getProjectName());
        assertThat(savedProject.getBpm()).isEqualTo(testProject.getBpm());
        assertThat(savedProject.getTracks().get(0)).isEqualTo(testTrack);
    }

    @Test
    @DisplayName("프로젝트 목록 보기 테스트 - 25개의 프로젝트가 있을 때 첫 페이지를 요청할 경우 프로젝트 개수 24개와 다음 페이지 존재 여부 true를 반환한다.")
    void testProjectPaginationFirstPage() {
        // given
        List<Project> projects = projectsOf25();
        int size = 24;
        Pageable pageable = (Pageable) PageRequest.of(0, size);

        // when
        when(projectRepository.findAllByOrderByModifiedDateFirstPage(pageable.getPageSize() + 1)).thenReturn(projects);
        when(likeRepository.countByProjectId(any(Long.class))).thenReturn(0L);
        when(likeRepository.existsByMemberAndProject(eq(null), any(Project.class))).thenReturn(false);

        ProjectsResponseDto responseDto = projectService.getProjects(size, null, null);

        // then
        assertThat(responseDto.getResponseDtos().size()).isEqualTo(size);
        assertThat(responseDto.isHasNext()).isTrue();
    }

    @Test
    @DisplayName("프로젝트 목록 보기 테스트 - 25개의 프로젝트가 있을 때 두 번째 페이지를 요청할 경우 프로젝트 개수 1개와 다음 페이지 존재 여부 false를 반환한다.")
    void testProjectPaginationSecondPage() {
        // given
        List<Project> projects = projectsOf25();
        int size = 24;
        Pageable pageable = (Pageable) PageRequest.of(1, size);

        // when
        when(projectRepository.findById(53L)).thenReturn(Optional.of(projects.get(22)));
        when(projectRepository.findAllByOrderByModifiedDate(eq(pageable.getPageSize() + 1), eq(53L), any(LocalDateTime.class))).thenReturn(lastProjectOfprojectsOf25());
        when(likeRepository.countByProjectId(any(Long.class))).thenReturn(0L);
        when(likeRepository.existsByMemberAndProject(eq(null), any(Project.class))).thenReturn(true);

        ProjectsResponseDto responseDto = projectService.getProjects(size, 53L, null);

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

    private List<Project> projectsOf25() {
        List<Project> projects = new ArrayList<>();

        for (int i = 30; i < 55; i++) {
            Project project = Project.builder()
                                     .id(Long.valueOf(i))
                                     .projectName("test project" + i)
                                     .bpm(i)
                                     .build();
            project.setModifiedDate(LocalDateTime.of(2022, 12, 19, 1, 0));

            project.addTrack(Track.builder()
                                  .id(Long.valueOf(i))
                                  .creator(testMember)
                                  .project(project)
                                  .trackName("test track" + i)
                                  .trackTag(TrackTag.PIANO)
                                  .build());

            projects.add(project);
        }

        return projects;
    }

    private List<Project> lastProjectOfprojectsOf25() {
        Project project = Project.builder()
                                 .id(54L)
                                 .projectName("test project" + 54)
                                 .bpm(54)
                                 .build();

        project.setModifiedDate(LocalDateTime.now());

        project.addTrack(Track.builder()
                              .id(54L)
                              .creator(testMember)
                              .project(project)
                              .trackName("test track" + 54)
                              .trackTag(TrackTag.PIANO)
                              .build());

        return Arrays.asList(project);
    }
}
