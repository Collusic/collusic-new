package com.collusic.collusicbe.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class RequestProjectSaveRequestDto {
    private RequestProjectDto requestProjectDto;
    private MultipartFile multipartFile;
}