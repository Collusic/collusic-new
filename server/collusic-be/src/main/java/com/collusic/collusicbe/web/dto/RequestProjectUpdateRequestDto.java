package com.collusic.collusicbe.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RequestProjectUpdateRequestDto {
    private String title;
    private String content;
    private String uploadFilePath;
    private List<String> fields;
    private List<String> genres;
    private List<String> moods;
    private String lyrics;
    private MultipartFile multipartFile;
}
