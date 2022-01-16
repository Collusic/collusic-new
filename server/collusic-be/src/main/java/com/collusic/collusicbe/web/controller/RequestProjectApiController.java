package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.RequestProjectService;
import com.collusic.collusicbe.web.dto.RequestProjectSaveRequestDto;
import com.collusic.collusicbe.web.dto.RequestProjectsWithPaginationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class RequestProjectApiController {

    private final RequestProjectService requestProjectService;

    @PostMapping("/api/requestprojects")
    public ResponseEntity<Long> save(@ModelAttribute RequestProjectSaveRequestDto requestProjectSaveRequestDto) throws IOException {
        Long savedId = requestProjectService.save(requestProjectSaveRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(savedId);
    }

    @GetMapping("/api/requestprojects")
    public ResponseEntity<RequestProjectsWithPaginationDto> getRequestProjectsWithPagination(Pageable pageable) {
        RequestProjectsWithPaginationDto requestProjectsWithPagination = requestProjectService.getRequestProjectsWithPagination(pageable);
        return ResponseEntity.status(HttpStatus.OK)
                .body(requestProjectsWithPagination);
    }
}
