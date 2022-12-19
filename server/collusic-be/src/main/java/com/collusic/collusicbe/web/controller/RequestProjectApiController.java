package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.RequestProjectService;
import com.collusic.collusicbe.web.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
public class RequestProjectApiController {

    private final RequestProjectService requestProjectService;

    @PostMapping("/api/requestprojects")
    public ResponseEntity<RequestProjectResponseDto> save(@ModelAttribute RequestProjectSaveRequestDto requestProjectSaveRequestDto) throws IOException {
        RequestProjectResponseDto requestProjectResponseDto = new RequestProjectResponseDto();
        if (requestProjectSaveRequestDto.getMultipartFile().isEmpty()) {
            requestProjectResponseDto = requestProjectService.saveWithNoMultipartFile(requestProjectSaveRequestDto);
        } else {
            requestProjectResponseDto = requestProjectService.save(requestProjectSaveRequestDto);
        }
        return ResponseEntity.status(HttpStatus.OK)
                             .body(requestProjectResponseDto);
    }

    @PutMapping("/api/requestprojects/{requestProjectId}")
    public ResponseEntity<RequestProjectResponseDto> update(@PathVariable Long requestProjectId, @ModelAttribute RequestProjectUpdateRequestDto requestProjectUpdateRequestDto) throws IOException {
        RequestProjectResponseDto requestProjectResponseDto = requestProjectService.update(requestProjectId, requestProjectUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(requestProjectResponseDto);
    }

    @GetMapping("/api/requestprojects/{requestProjectId}")
    public ResponseEntity<RequestProjectResponseDto> findById(@PathVariable Long requestProjectId) {
        RequestProjectResponseDto requestProjectResponseDto = requestProjectService.findById(requestProjectId);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(requestProjectResponseDto);
    }

    @DeleteMapping("/api/requestprojects/{requestProjectId}")
    public ResponseEntity<Long> delete(@PathVariable Long requestProjectId) throws RuntimeException {
        requestProjectService.delete(requestProjectId);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(requestProjectId);
    }

    @GetMapping("/api/main/requestprojects")
    public ResponseEntity<RequestProjectsWithPaginationDto> getRequestProjectsWithPagination(@PageableDefault(size = 8, sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        RequestProjectsWithPaginationDto requestProjectsWithPagination = requestProjectService.getRequestProjectsWithPagination(pageable);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(requestProjectsWithPagination);
    }

    @GetMapping("/api/requestprojects/{requestProjectId}/contributeprojects")
    public ResponseEntity<RequestProjectDetailPageDto> getRequestProjectWithContributeProjects(@PathVariable Long requestProjectId) {
        RequestProjectDetailPageDto requestProjectDetailPageDto = requestProjectService.getRequestProjectWithContributeProjects(requestProjectId);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(requestProjectDetailPageDto);
    }
}
