package com.collusic.collusicbe.web.dto;

import com.collusic.collusicbe.domain.contributeproject.ContributeProject;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ContributeProjectResponseDto {
    private List<String> fields;
    private String content;
    private String lyrics;
    private String uploadFilePath;
    private Boolean adoptFlag;

    public ContributeProjectResponseDto(ContributeProject contributeProject) {
        this.fields = contributeProject.getField().stream().map(contributeProjectFieldEntity -> contributeProjectFieldEntity.getField()).collect(Collectors.toList());
        this.content = contributeProject.getContent();
        this.lyrics = contributeProject.getLyrics();
        this.uploadFilePath = contributeProject.getUploadFilePath();
        this.adoptFlag = contributeProject.getAdoptFlag();
    }
}
