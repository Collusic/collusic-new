package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.RequestProjectService;
import com.collusic.collusicbe.web.dto.RequestProjectResponseDto;
import com.collusic.collusicbe.web.dto.RequestProjectSaveRequestDto;
import com.collusic.collusicbe.web.dto.RequestProjectUpdateRequestDto;
import com.collusic.collusicbe.web.dto.RequestProjectsWithPaginationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class RequestProjectApiController {

    private final RequestProjectService requestProjectService;

    @PostMapping("/api/requestprojects")
    public ResponseEntity<RequestProjectResponseDto> save(@ModelAttribute RequestProjectSaveRequestDto requestProjectSaveRequestDto) throws IOException {
        RequestProjectResponseDto requestProjectResponseDto = requestProjectService.save(requestProjectSaveRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(requestProjectResponseDto);
    }

    @PutMapping("/api/requestprojects/{id}")
    public ResponseEntity<Long> update(@PathVariable Long id, @ModelAttribute RequestProjectUpdateRequestDto requestProjectUpdateRequestDto) throws IOException {
        Long updatedId = requestProjectService.update(id, requestProjectUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(updatedId);
    }

    @GetMapping("/api/requestprojects/{id}")
    public ResponseEntity<RequestProjectResponseDto> findById(@PathVariable Long id) {
        RequestProjectResponseDto requestProjectResponseDto = requestProjectService.findById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(requestProjectResponseDto);
    }

    @DeleteMapping("/api/requestprojects/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        requestProjectService.delete(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(id);
    }

    @GetMapping("/api/main/requestprojects")
    public ResponseEntity<RequestProjectsWithPaginationDto> getRequestProjectsWithPagination(Pageable pageable) {
        RequestProjectsWithPaginationDto requestProjectsWithPagination = requestProjectService.getRequestProjectsWithPagination(pageable);
        return ResponseEntity.status(HttpStatus.OK)
                .body(requestProjectsWithPagination);
    }
}
