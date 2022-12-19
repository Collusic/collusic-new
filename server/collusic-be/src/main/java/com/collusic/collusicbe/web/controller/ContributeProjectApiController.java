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

    @PostMapping("/api/requestprojects/{requestProjectId}/contributeprojects")
    public ResponseEntity<ContributeProjectResponseDto> save(@ModelAttribute ContributeProjectSaveRequestDto contributeProjectSaveRequestDto, @PathVariable Long requestProjectId) throws IOException {
        ContributeProjectResponseDto contributeProjectResponseDto = new ContributeProjectResponseDto();
        if (contributeProjectSaveRequestDto.getMultipartFile().isEmpty()) {
            contributeProjectResponseDto = contributeProjectService.saveWithNoMultipartFile(contributeProjectSaveRequestDto, requestProjectId);
        } else {
            contributeProjectResponseDto = contributeProjectService.save(contributeProjectSaveRequestDto, requestProjectId);
        }

        return ResponseEntity.status(HttpStatus.OK)
                             .body(contributeProjectResponseDto);
    }

    @GetMapping("/api/requestprojects/{requestProjectId}/contributeprojects/{contributeProjectId}")
    public ResponseEntity<ContributeProjectResponseDto> findById(@PathVariable Long contributeProjectId) {
        ContributeProjectResponseDto contributeProjectResponseDto = contributeProjectService.findById(contributeProjectId);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(contributeProjectResponseDto);
    }

    @PutMapping("/api/requestprojects/{requestProjectId}/contributeprojects/{contributeProjectId}")
    public ResponseEntity<ContributeProjectResponseDto> update(@ModelAttribute ContributeProjectUpdateRequestDto contributeProjectUpdateRequestDto, @PathVariable Long requestProjectId, @PathVariable Long contributeProjectId) throws IOException {
        ContributeProjectResponseDto contributeProjectResponseDto = contributeProjectService.update(contributeProjectUpdateRequestDto, contributeProjectId);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(contributeProjectResponseDto);
    }

    @DeleteMapping("/api/requestprojects/{requestProjectId}/contributeprojects/{contributeProjectId}")
    public ResponseEntity<Long> delete(@PathVariable Long contributeProjectId) throws RuntimeException {
        contributeProjectService.delete(contributeProjectId);
        return ResponseEntity.status(HttpStatus.OK)
                             .body(contributeProjectId);
    }
}
