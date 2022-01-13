package com.collusic.collusicbe.web.controller;

import com.collusic.collusicbe.service.RequestProjectService;
import com.collusic.collusicbe.web.dto.RequestProjectSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        System.out.println("!!!!!!!!!!");
        System.out.println(requestProjectSaveRequestDto.getTitle());
        System.out.println(requestProjectSaveRequestDto.getContent());
        System.out.println(requestProjectSaveRequestDto.getFields());
        System.out.println(requestProjectSaveRequestDto.getGenres());
        System.out.println(requestProjectSaveRequestDto.getMultipartFile().getOriginalFilename());
        System.out.println(requestProjectSaveRequestDto.getLyrics());
        System.out.println(requestProjectSaveRequestDto.getMoods());


        Long savedId = requestProjectService.save(requestProjectSaveRequestDto);
        System.out.println("here!!!!!!!!!!");
        return ResponseEntity.status(HttpStatus.OK)
                .body(savedId);
    }
}
