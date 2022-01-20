package com.collusic.collusicbe.web.dto;

import com.collusic.collusicbe.domain.requestproject.RequestProject;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class RequestProjectResponseDto {
    private Long id;
    private String title;
    private String content;
    private String uploadFilePath;
    private List<String> fields;
    private List<String> genres;
    private List<String> moods;
    private String lyrics;

    public RequestProjectResponseDto(RequestProject requestProject) {
        this.id = requestProject.getId();
        this.title = requestProject.getTitle();
        this.content = requestProject.getContent();
        this.uploadFilePath = requestProject.getUploadFilePath();
        this.fields = requestProject.getField().stream().map(fieldEntity -> new String(fieldEntity.getField())).collect(Collectors.toList());
        this.genres = requestProject.getGenre().stream().map(genreEntity -> new String(genreEntity.getGenre())).collect(Collectors.toList());
        this.moods = requestProject.getMood().stream().map(moodEntity -> new String(moodEntity.getMood())).collect(Collectors.toList());
        this.lyrics = requestProject.getLyrics();
    }
}
