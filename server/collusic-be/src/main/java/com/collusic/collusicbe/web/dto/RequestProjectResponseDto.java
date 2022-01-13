package com.collusic.collusicbe.web.dto;

import com.collusic.collusicbe.domain.field.FieldEntity;
import com.collusic.collusicbe.domain.genre.GenreEntity;
import com.collusic.collusicbe.domain.mood.MoodEntity;
import com.collusic.collusicbe.domain.requestproject.RequestProject;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class RequestProjectResponseDto {
    private String title;
    private String content;
    private List<String> field = new ArrayList<>();
    private List<String> genre = new ArrayList<>();
    private List<String> mood = new ArrayList<>();

    public RequestProjectResponseDto(RequestProject requestProject) {
        this.title = requestProject.getTitle();
        this.content = requestProject.getContent();
        this.field = requestProject.getField().stream().map(FieldEntity::getField).collect(Collectors.toList());
        this.genre = requestProject.getGenre().stream().map(GenreEntity::getGenre).collect(Collectors.toList());
        this.mood = requestProject.getMood().stream().map(MoodEntity::getMood).collect(Collectors.toList());
    }
}
