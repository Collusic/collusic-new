package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.config.auth.LoginMember;
import com.collusic.collusicbe.config.auth.Visitor;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.web.controller.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<Void> readProject(@PathVariable Long projectId) {
        Project project = projectService.findById(projectId);

        return ResponseEntity.ok(null); // TODO: project resposne dto 클래스 추가하여 반영할 것
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectCreateResponseDto> createProject(@LoginMember Member member, @Validated @RequestBody ProjectCreateRequestDto requestDto) {
        Project project = projectService.createProject(member, requestDto);
        return ResponseEntity.created(URI.create("/projects/" + project.getId())).body(new ProjectCreateResponseDto(project));
    }

    @PutMapping("/projects/{projectId}")
    public ResponseEntity<ProjectUpdateResponseDto> updateProject(@PathVariable Long projectId, @LoginMember Member member, @Validated @RequestBody ProjectUpdateRequestDto requestDto) {
        Project project = projectService.updateProject(projectId, member, requestDto);
        return ResponseEntity.ok().body(new ProjectUpdateResponseDto(project));
    }

    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long projectId, @LoginMember Member member) {
        projectService.deleteProject(projectId, member);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/projects")
    public ResponseEntity<ProjectsResponseDto> readProjects(@PageableDefault(size = 12) Pageable pageable, @Visitor Member member) {
        ProjectsResponseDto responseDto = projectService.getProjects(pageable, member);
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/projects/{projectId}/like")
    public ResponseEntity<LikeResponseDto> likeProject(@PathVariable Long projectId, @LoginMember Member member) {
        LikeResponseDto likeResponseDto = projectService.likeProject(projectId, member);
        return ResponseEntity.ok().body(likeResponseDto);
    }
}
