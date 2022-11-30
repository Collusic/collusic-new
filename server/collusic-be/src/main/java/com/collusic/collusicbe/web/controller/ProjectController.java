package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.config.auth.LoginMember;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<Void> readProject(@PathVariable UUID projectId) {
        Project project = projectService.findById(projectId);

        return ResponseEntity.ok(null); // TODO: project resposne dto 클래스 추가하여 반영할 것
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectCreateResponseDto> createProject(@LoginMember Member member, @RequestBody ProjectCreateRequestDto requestDto) {
        Project project = projectService.createProject(member, requestDto);
        return ResponseEntity.created(URI.create("/projects/" + project.getId())).body(new ProjectCreateResponseDto(project));
    }
}
