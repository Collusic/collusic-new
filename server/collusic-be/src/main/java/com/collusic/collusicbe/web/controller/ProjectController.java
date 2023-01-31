package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.global.resolver.LoginMember;
import com.collusic.collusicbe.global.resolver.Visitor;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.web.controller.response.*;
import com.collusic.collusicbe.web.controller.request.ProjectCreateRequestDto;
import com.collusic.collusicbe.web.controller.request.ProjectUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<ProjectResponseDto> readProject(@PathVariable Long projectId, @Visitor Member member) {
        ProjectResponseDto responseDto = projectService.getProject(projectId, member);
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectCreateResponseDto> createProject(
            @LoginMember Member member,
            @Validated @ModelAttribute ProjectCreateRequestDto requestDto) throws IOException {
        Project project = projectService.createProject(member, requestDto);
        System.out.println("사이즈: " + project.getTracks().size());
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
    public ResponseEntity<ProjectsResponseDto> readProjects(@RequestParam(name = "size", defaultValue = "24") int size, @RequestParam(name = "cursorId", required = false) Long cursorId, @Visitor Member member) {
        ProjectsResponseDto responseDto = projectService.getProjects(size, cursorId, member);
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/projects/{projectId}/like")
    public ResponseEntity<LikeResponseDto> likeProject(@PathVariable Long projectId, @LoginMember Member member) {
        LikeResponseDto likeResponseDto = projectService.likeProject(projectId, member);
        return ResponseEntity.ok().body(likeResponseDto);
    }
}
