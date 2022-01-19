package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.ContributeProjectService;
import com.collusic.collusicbe.web.dto.ContributeProjectResponseDto;
import com.collusic.collusicbe.web.dto.ContributeProjectSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class ContributeProjectApiController {

    private final ContributeProjectService contributeProjectService;

    @PostMapping("/api/requestprojects/{id}/contributeprojects")
    public ResponseEntity<ContributeProjectResponseDto> save(@ModelAttribute ContributeProjectSaveRequestDto contributeProjectSaveRequestDto, @PathVariable Long id) throws IOException {
        ContributeProjectResponseDto contributeProjectResponseDto = contributeProjectService.save(contributeProjectSaveRequestDto, id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(contributeProjectResponseDto);
    }
}
