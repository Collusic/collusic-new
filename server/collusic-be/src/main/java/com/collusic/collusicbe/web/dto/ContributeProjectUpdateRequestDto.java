package com.collusic.collusicbe.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ContributeProjectUpdateRequestDto {
    private List<String> fields;
    private String content;
    private String lyrics;
    private String uploadFilePath;
    private MultipartFile multipartFile;
}
