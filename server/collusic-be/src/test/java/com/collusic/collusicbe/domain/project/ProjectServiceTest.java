package com.collusic.collusicbe.domain.project;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackTag;
import com.collusic.collusicbe.global.exception.CannotDeleteException;
import com.collusic.collusicbe.global.exception.ForbiddenException;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.service.TrackService;
import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.LikeResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.ProjectUpdateRequestDto;
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
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

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

    @Test
    @DisplayName("프로젝트 좋아요 기능 테스트 - 프로젝트 좋아요를 누르면 좋아요 개수 1개와 좋아요 여부 true를 반환한다.")
    void testLikeAction() {
        // when
        when(projectRepository.findById(testProject.getId())).thenReturn(Optional.of(testProject));
        when(likeRepository.findLikesByProjectIdAndMemberId(testProject.getId(), testMember.getId())).thenReturn(Optional.empty());
        when(likeRepository.countByProjectId(testProject.getId())).thenReturn(1L);
        when(likeRepository.existsByMemberAndProject(testMember, testProject)).thenReturn(true);

        LikeResponseDto responseDto = projectService.likeProject(testProject.getId(), testMember);

        // then
        assertThat(responseDto.getLikeCount()).isEqualTo(1);
        assertThat(responseDto.getIsLiked()).isTrue();
    }

    @Test
    @DisplayName("프로젝트 좋아요 기능 취소 테스트 - 프로젝트 좋아요 취소를 누르면 좋아요 개수 0개와 좋아요 여부 false를 반환한다.")
    void testLikeActionCancel() {
        // given
        ProjectLike testProjectLike = ProjectLike.builder()
                                                 .member(testMember)
                                                 .project(testProject)
                                                 .build();

        // when
        when(projectRepository.findById(testProject.getId())).thenReturn(Optional.of(testProject));
        when(likeRepository.findLikesByProjectIdAndMemberId(testProject.getId(), testMember.getId())).thenReturn(Optional.of(testProjectLike));
        doNothing().when(likeRepository).delete(testProjectLike);
        when(likeRepository.countByProjectId(testProject.getId())).thenReturn(0L);
        when(likeRepository.existsByMemberAndProject(testMember, testProject)).thenReturn(false);

        LikeResponseDto responseDto = projectService.likeProject(testProject.getId(), testMember);

        // then
        assertThat(responseDto.getLikeCount()).isEqualTo(0);
        assertThat(responseDto.getIsLiked()).isFalse();
    }

    @Test
    @DisplayName("프로젝트 삭제 테스트 - 프로젝트 삭제 성공")
    void testProjectDelete() {
        // when
        when(projectRepository.findById(testProject.getId())).thenReturn(Optional.of(testProject));
        doNothing().when(projectRepository).delete(testProject);

        projectService.deleteProject(testProject.getId(), testMember);

        // then
        verify(projectRepository, times(1)).delete(testProject);
    }

    @Test
    @DisplayName("프로젝트 삭제 실패 테스트 - 트랙 생성자가 null이 아니면서 트랙 생성자와 삭제하는 사람이 같지 않은 경우 프로젝트를 삭제할 수 없고 예외(CannotDeleteException)를 반환한다.")
    void testProjectDeleteFail() {
        Member testMember2 = Member.builder()
                                   .id(2L)
                                   .nickname("testMember")
                                   .build();
        // given
        testProject.addTrack(Track.builder()
                                  .id(2L)
                                  .trackName("test track2")
                                  .creator(testMember2)
                                  .project(testProject)
                                  .trackName("test track name")
                                  .trackTag(TrackTag.PIANO)
                                  .build());

        // when
        when(projectRepository.findById(testProject.getId())).thenReturn(Optional.of(testProject));

        // then
        assertThatThrownBy(() -> projectService.deleteProject(testProject.getId(), testMember))
                .isInstanceOf(CannotDeleteException.class);
    }

    @Test
    @DisplayName("프로젝트 수정 테스트 - 루트 트랙의 생성자와 프로젝트 수정자가 일치할 경우 프로젝트명과 트랙 태그 수정이 가능하다.")
    void testProjectUpdate() {
        // given
        ProjectUpdateRequestDto updateProjectDto = ProjectUpdateRequestDto.builder()
                                                                          .projectName("update project")
                                                                          .trackTag("드럼")
                                                                          .build();

        // when
        when(projectRepository.findById(testProject.getId())).thenReturn(Optional.of(testProject));
        Project updateProject = projectService.updateProject(testProject.getId(), testMember, updateProjectDto);

        // then
        assertThat(updateProject.getProjectName()).isEqualTo(updateProjectDto.getProjectName());
        assertThat(updateProject.getTracks().get(0).getTrackTag()).isEqualTo(updateProjectDto.getTrackTag());
    }

    @Test
    @DisplayName("프로젝트 수정 실패 테스트 - 루트 트랙의 생성자와 프로젝트 수정자가 일치하지 않을 경우 프로젝트명과 트랙 태그 수정이 불가능하고 예외(ForbiddenException)를 반환한다.")
    void testProjectUpdateFail() {
        // given
        ProjectUpdateRequestDto updateProjectDto = ProjectUpdateRequestDto.builder()
                                                                          .projectName("update project")
                                                                          .trackTag("드럼")
                                                                          .build();

        Member testMember2 = Member.builder()
                                   .id(2L)
                                   .nickname("testMember")
                                   .build();

        // when
        when(projectRepository.findById(testProject.getId())).thenReturn(Optional.of(testProject));

        // then
        assertThatThrownBy(() -> projectService.updateProject(testProject.getId(), testMember2, updateProjectDto))
                .isInstanceOf(ForbiddenException.class);
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
