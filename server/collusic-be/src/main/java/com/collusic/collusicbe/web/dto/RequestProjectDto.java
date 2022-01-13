package com.collusic.collusicbe.web.dto;

import com.collusic.collusicbe.domain.field.FieldEntity;
import com.collusic.collusicbe.domain.genre.GenreEntity;
import com.collusic.collusicbe.domain.mood.MoodEntity;
import com.collusic.collusicbe.domain.requestproject.RequestProject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class RequestProjectDto {
    private String title;
    private String content;
    private String uploadFilePath;
    private List<String> fields;
    private List<String> genres;
    private List<String> moods;
    private String lyrics;

    public RequestProject toEntity() {
        return RequestProject.builder()
                .title(title)
                .content(content)
                .uploadFilePath(uploadFilePath)
                .field(fields.stream().map(FieldEntity::new).collect(Collectors.toList()))
                .genre(genres.stream().map(GenreEntity::new).collect(Collectors.toList()))
                .mood(moods.stream().map(MoodEntity::new).collect(Collectors.toList()))
                .lyrics(lyrics)
                .build();
    }
}
