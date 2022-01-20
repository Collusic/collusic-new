package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.ContributeProjectService;
import com.collusic.collusicbe.web.dto.ContributeProjectResponseDto;
import com.collusic.collusicbe.web.dto.ContributeProjectSaveRequestDto;
import com.collusic.collusicbe.web.dto.ContributeProjectUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/api/requestprojects/{requestId}/contributeprojects/{contributeId}")
    public ResponseEntity<ContributeProjectResponseDto> update(@ModelAttribute ContributeProjectUpdateRequestDto contributeProjectUpdateRequestDto, @PathVariable Long requestId, @PathVariable Long contributeId){
        ContributeProjectResponseDto contributeProjectResponseDto = contributeProjectService.update(contributeProjectUpdateRequestDto, contributeId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(contributeProjectResponseDto);
    }
}
