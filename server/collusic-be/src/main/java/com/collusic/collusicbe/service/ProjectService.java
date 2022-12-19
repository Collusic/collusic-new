package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.LikeRepository;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.project.ProjectLike;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackRepository;
import com.collusic.collusicbe.global.exception.CannotDeleteException;
import com.collusic.collusicbe.global.exception.CannotUpdateException;
import com.collusic.collusicbe.web.controller.ProjectInventoryResponseDto;
import com.collusic.collusicbe.web.controller.ProjectsResponseDto;
import com.collusic.collusicbe.web.controller.dto.LikeResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.ProjectUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TrackRepository trackRepository;
    private final LikeRepository likeRepository;

    public Project findById(Long id) {
        return projectRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public Project createProject(Member member, ProjectCreateRequestDto requestDto) {
        Project project = Project.builder()
                                 .projectName(requestDto.getProjectName())
                                 .bpm(requestDto.getBpm())
                                 .fileUrl("empty")
                                 .build();

        Project save = projectRepository.save(project);

        Track track = Track.builder()
                           .trackName(project.getProjectName())
                           .trackTag(requestDto.getTrackTag())
                           .creator(member)
                           .project(project)
                           .orderInProject(project.getNextTrackOrder())
                           .build();

        project.addTrack(track);

        trackRepository.save(track);

        return save;
    }

    public ProjectsResponseDto getProjects(Pageable pageable, Member member) {
        Slice<Project> projects = projectRepository.findAllByOrderByCreatedDate(pageable); // TODO : 프로젝트 정렬 쿼리 복잡하기 때문에 트랙 생성 시마다 프로젝트 수정 일자를 업데이트 시켜주고 프로젝트 수정 일자 기준 정렬로 바꾸기

        List<ProjectInventoryResponseDto> collect;

        if (member == null) {
            collect = projects.getContent().stream()
                                                                .map(project -> ProjectInventoryResponseDto.builder()
                                                                                                           .projectId(project.getId())
                                                                                                           .projectName(project.getProjectName())
                                                                                                           .trackTags(project.collectTrackTags())
                                                                                                           .likeCount(likeRepository.countByProjectId(project.getId()).intValue())
                                                                                                           .isLiked(false)
                                                                                                           .build())
                                                                .collect(Collectors.toList());
        } else {
            collect = projects.getContent().stream()
                              .map(project -> ProjectInventoryResponseDto.builder()
                                                                         .projectId(project.getId())
                                                                         .projectName(project.getProjectName())
                                                                         .trackTags(project.collectTrackTags())
                                                                         .likeCount(likeRepository.countByProjectId(project.getId()).intValue())
                                                                         .isLiked(likeRepository.existsByMemberAndProject(member, project))
                                                                         .build())
                              .collect(Collectors.toList());
        }

        ProjectsResponseDto responseDto = ProjectsResponseDto.builder()
                                                             .responseDtos(collect)
                                                             .projectCount(projects.getNumberOfElements())
                                                             .hasNext(projects.hasNext())
                                                             .build();
        return responseDto;
    }

    @Transactional
    public LikeResponseDto likeProject(Long projectId, Member member) {
        Project project = projectRepository.findById(projectId)
                                           .orElseThrow(NoSuchElementException::new);

        Optional<ProjectLike> like = likeRepository.findLikesByProjectIdAndMemberId(projectId, member.getId());
        if (like.isPresent()) {
            project.deleteLike(like.get());
            likeRepository.delete(like.get());
            return new LikeResponseDto(likeRepository.countByProjectId(projectId).intValue(), likeRepository.existsByMemberAndProject(member, project));
        }

        ProjectLike projectLike = ProjectLike.builder()
                                             .member(member)
                                             .project(project)
                                             .build();

        likeRepository.save(projectLike);

        return new LikeResponseDto(likeRepository.countByProjectId(projectId).intValue(), likeRepository.existsByMemberAndProject(member, project));
    }

    @Transactional
    public void deleteProject(Long projectId, Member member) {
        Project project = projectRepository.findById(projectId)
                                           .orElseThrow(NoSuchElementException::new);

        Track rootTrack = project.getTracks().get(0);

        if (!rootTrack.getCreator().isSameMember(member)) {
            throw new CannotDeleteException("타인 생성한 프로젝트를 삭제할 수 없습니다.");
        }

        if (!project.haveOnlyOwnTracks(member)) {
            throw new CannotDeleteException("타인이 생성한 트랙이 존재하는 경우, 프로젝트를 삭제할 수 없습니다.");
        }

        project.getTracks().forEach(trackRepository::delete);

        projectRepository.delete(project);
    }

    @Transactional
    public Project updateProject(Long projectId, Member member, ProjectUpdateRequestDto requestDto) {
        Project project = projectRepository.findById(projectId)
                                           .orElseThrow(NoSuchElementException::new);

        Track rootTrack = project.getTracks().get(0);

        if (!rootTrack.getCreator().isSameMember(member)) {
            throw new CannotUpdateException("프로젝트 수정이 불가능합니다.");
        }

        project.update(requestDto.getProjectName(), requestDto.getTrackTag());

        return project;
    }
}