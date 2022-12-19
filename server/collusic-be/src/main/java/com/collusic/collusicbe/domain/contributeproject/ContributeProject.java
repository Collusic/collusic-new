package com.collusic.collusicbe.domain.contributeproject;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.field.ContributeProjectFieldEntity;
import com.collusic.collusicbe.domain.requestproject.RequestProject;
import com.collusic.collusicbe.web.dto.ContributeProjectUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@Entity
public class ContributeProject extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CONTRIBUTE_PROJECT_ID")
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "REQUEST_PROJECT_ID")
    private RequestProject requestProject;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "CONTRIBUTE_PROJECT_ID")
    private List<ContributeProjectFieldEntity> field;

    @Column(columnDefinition = "TEXT", length = 300, nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT", length = 1500)
    private String lyrics;

    private Boolean adoptFlag;

    @Column(columnDefinition = "TEXT")
    private String uploadFilePath;

    @Builder
    public ContributeProject(RequestProject requestProject, List<ContributeProjectFieldEntity> field, String content, String lyrics, Boolean adoptFlag, String uploadFilePath) {
        this.requestProject = requestProject;
        this.field = field;
        this.content = content;
        this.lyrics = lyrics;
        this.adoptFlag = adoptFlag;
        this.uploadFilePath = uploadFilePath;
    }

    public void update(ContributeProjectUpdateRequestDto contributeProjectUpdateRequestDto) {
        this.content = contributeProjectUpdateRequestDto.getContent();
        this.uploadFilePath = contributeProjectUpdateRequestDto.getUploadFilePath();
        this.field.clear();
        this.field.addAll(contributeProjectUpdateRequestDto.getFields().stream().map(field -> new ContributeProjectFieldEntity(field)).collect(Collectors.toList()));
        this.lyrics = contributeProjectUpdateRequestDto.getLyrics();
    }

    public boolean isAdopted() {
        if (this.adoptFlag == true) {
            return true;
        }
        return false;
    }
}
