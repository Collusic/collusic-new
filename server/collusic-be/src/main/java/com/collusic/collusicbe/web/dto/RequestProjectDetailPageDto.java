package com.collusic.collusicbe.web.dto;

import com.collusic.collusicbe.domain.requestproject.RequestProject;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class RequestProjectDetailPageDto {
    private Long id;
    private String title;
    private String content;
    private String uploadFilePath;
    private List<String> fields;
    private List<String> genres;
    private List<String> moods;
    private String lyrics;
    private List<ContributeProjectResponseDto> contributeProjectResponseDtos;

    public RequestProjectDetailPageDto(RequestProject requestProject, List<ContributeProjectResponseDto> contributeProjectResponseDtos) {
        this.id = requestProject.getId();
        this.title = requestProject.getTitle();
        this.content = requestProject.getContent();
        this.uploadFilePath = requestProject.getUploadFilePath();
        this.fields = requestProject.getField().stream().map(fieldEntity -> fieldEntity.getField()).collect(Collectors.toList());
        this.genres = requestProject.getGenre().stream().map(genreEntity -> genreEntity.getGenre()).collect(Collectors.toList());
        this.moods = requestProject.getMood().stream().map(moodEntity -> moodEntity.getMood()).collect(Collectors.toList());
        this.lyrics = requestProject.getLyrics();
        this.contributeProjectResponseDtos = contributeProjectResponseDtos;
    }
}
