package com.collusic.collusicbe.domain.requestproject;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.field.FieldEntity;
import com.collusic.collusicbe.domain.genre.GenreEntity;
import com.collusic.collusicbe.domain.mood.MoodEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class RequestProject extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REQUEST_PROJECT_ID")
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", length = 300, nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT")
    private String uploadFilePath;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "REQUEST_PROJECT_ID")
    private List<FieldEntity> field;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "REQUEST_PROJECT_ID")
    private List<GenreEntity> genre;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "REQUEST_PROJECT_ID")
    private List<MoodEntity> mood;

    @Column(columnDefinition = "TEXT", length = 1500)
    private String lyrics;

    @Builder
    public RequestProject(String title, String content, String uploadFilePath, List<FieldEntity> field, List<GenreEntity> genre, List<MoodEntity> mood, String lyrics) {
        this.title = title;
        this.content = content;
        this.uploadFilePath = uploadFilePath;
        this.field = field;
        this.genre = genre;
        this.mood = mood;
        this.lyrics = lyrics;
    }
}
