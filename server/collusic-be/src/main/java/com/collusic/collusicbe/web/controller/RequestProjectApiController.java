package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.RequestProjectService;
import com.collusic.collusicbe.web.dto.RequestProjectResponseDto;
import com.collusic.collusicbe.web.dto.RequestProjectSaveRequestDto;
import com.collusic.collusicbe.web.dto.RequestProjectUpdateRequestDto;
import com.collusic.collusicbe.web.dto.RequestProjectsWithPaginationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class RequestProjectApiController {

    private final RequestProjectService requestProjectService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/requestprojects")
    public ResponseEntity<RequestProjectResponseDto> save(@ModelAttribute RequestProjectSaveRequestDto requestProjectSaveRequestDto) throws IOException {
        RequestProjectResponseDto requestProjectResponseDto = requestProjectService.save(requestProjectSaveRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(requestProjectResponseDto);
    }

    @PutMapping("/api/requestprojects/{requestProjectId}")
    public ResponseEntity<RequestProjectResponseDto> update(@PathVariable Long requestProjectId, @ModelAttribute RequestProjectUpdateRequestDto requestProjectUpdateRequestDto) throws IOException {
        RequestProjectResponseDto requestProjectResponseDto = requestProjectService.update(requestProjectId, requestProjectUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(requestProjectResponseDto);
    }

    @CrossOrigin(origins = "http://localhost:3000")
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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/main/requestprojects")
    public ResponseEntity<RequestProjectsWithPaginationDto> getRequestProjectsWithPagination(@PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC)Pageable pageable) {
        RequestProjectsWithPaginationDto requestProjectsWithPagination = requestProjectService.getRequestProjectsWithPagination(pageable);
        return ResponseEntity.status(HttpStatus.OK)
                .body(requestProjectsWithPagination);
    }
}
