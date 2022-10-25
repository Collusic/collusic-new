package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<Void> readProject(@PathVariable Long projectId) {
        Project project = projectService.findById(projectId);

        return ResponseEntity.ok(null); // TODO: project resposne dto 클래스 추가하여 반영할 것
    }
}
