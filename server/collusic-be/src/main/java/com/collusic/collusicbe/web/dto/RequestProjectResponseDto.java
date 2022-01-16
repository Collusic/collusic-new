package com.collusic.collusicbe.web.dto;

import com.collusic.collusicbe.domain.requestproject.RequestProject;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class RequestProjectResponseDto {
    private String title;
    private String content;
    private String uploadFilePath;
    private List<String> fields;
    private List<String> genres;
    private List<String> moods;
    private String lyrics;

    @Builder
    public RequestProjectResponseDto(String title, String content, String uploadFilePath, List<String> fields, List<String> genres, List<String> moods, String lyrics) {
        this.title = title;
        this.content = content;
        this.uploadFilePath = uploadFilePath;
        this.fields = fields;
        this.genres = genres;
        this.moods = moods;
        this.lyrics = lyrics;
    }

    public static RequestProjectResponseDto toRequestProjectResponseDto(RequestProject requestProject) {
        return RequestProjectResponseDto.builder()
                .title(requestProject.getTitle())
                .content(requestProject.getContent())
                .uploadFilePath(requestProject.getUploadFilePath())
                .fields(requestProject.getField().stream().map(fieldEntity -> new String(fieldEntity.getField())).collect(Collectors.toList()))
                .genres(requestProject.getGenre().stream().map(genreEntity -> new String(genreEntity.getGenre())).collect(Collectors.toList()))
                .moods(requestProject.getMood().stream().map(moodEntity -> new String(moodEntity.getMood())).collect(Collectors.toList()))
                .lyrics(requestProject.getLyrics())
                .build();
    }
}
