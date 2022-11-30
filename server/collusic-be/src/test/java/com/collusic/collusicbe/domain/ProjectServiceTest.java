package com.collusic.collusicbe.domain;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.domain.track.TrackTag;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
    private TrackRepository trackRepository;

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
                             .id(UUID.fromString("247f720a-3eb6-4ba4-9dc9-9f5bde8014a3"))
                             .projectName("test project name")
                             .bpm(45)
                             .build();
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
    void testCreateProject() {
        // given
        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                                                                    .projectName("test project name")
                                                                    .bpm(45)
                                                                    .trackTag("피아노")
                                                                    .build();

        // when
        when(projectRepository.save(any(Project.class))).thenReturn(testProject);
        when(trackRepository.save(any(Track.class))).thenReturn(testTrack);
        Project savedProject = projectService.createProject(testMember, requestDto);

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
        when(projectRepository.findAllByOrderByCreatedDate(any(Pageable.class))).thenReturn(slice);
        ProjectsResponseDto responseDto = projectService.getProjects(pageable);

        // then
        assertThat(responseDto.getResponseDtos().size()).isEqualTo(1);
        assertThat(responseDto.isHasNext()).isFalse();
    }
}
