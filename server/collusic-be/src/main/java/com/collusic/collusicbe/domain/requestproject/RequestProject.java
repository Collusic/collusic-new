package com.collusic.collusicbe.domain.requestproject;

import com.collusic.collusicbe.domain.contributeproject.ContributeProject;
import com.collusic.collusicbe.domain.field.FieldEntity;
import com.collusic.collusicbe.domain.genre.GenreEntity;
import com.collusic.collusicbe.domain.mood.MoodEntity;
import com.collusic.collusicbe.domain.upload.UploadFile;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class RequestProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REQUEST_PROJECT_ID")
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", length = 300, nullable = false)
    private String content;

    @Embedded
    private UploadFile musicFile;

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
}
