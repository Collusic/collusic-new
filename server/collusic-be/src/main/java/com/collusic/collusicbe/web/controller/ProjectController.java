package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.config.auth.LoginMember;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.service.ProjectService;
import com.collusic.collusicbe.web.controller.dto.LikeResponseDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateRequestDto;
import com.collusic.collusicbe.web.controller.dto.ProjectCreateResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<ProjectCreateResponseDto> createProject(
            @LoginMember Member member,
            @RequestPart(value = "audioFile") MultipartFile audioFile,
            @Validated @RequestPart(value = "projectCreateRequest") ProjectCreateRequestDto requestDto) throws IOException {
        Project project = projectService.createProject(member, requestDto, audioFile);
        return ResponseEntity.created(URI.create("/projects/" + project.getId())).body(new ProjectCreateResponseDto(project));
    }

    @GetMapping("/projects")
    public ResponseEntity<ProjectsResponseDto> readProjects(@PageableDefault(size = 12) Pageable pageable) {
        ProjectsResponseDto responseDto = projectService.getProjects(pageable);
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/projects/{projectId}/like")
    public ResponseEntity<LikeResponseDto> likeProject(@PathVariable Long projectId, @LoginMember Member member) {
        LikeResponseDto likeResponseDto = projectService.likeProject(projectId, member);
        return ResponseEntity.ok().body(likeResponseDto);
    }
}
