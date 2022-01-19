package com.collusic.collusicbe.web.dto;

import com.collusic.collusicbe.domain.contributeproject.ContributeProject;
import com.collusic.collusicbe.domain.field.ContributeProjectFieldEntity;
import com.collusic.collusicbe.domain.requestproject.RequestProject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class ContributeProjectSaveRequestDto {
    private List<String> fields;
    private String content;
    private String lyrics;
    private String uploadFilePath;
    private MultipartFile multipartFile;

    public ContributeProject toEntity(RequestProject requestProject) {
        return ContributeProject.builder()
                .requestProject(requestProject)
                .field(fields.stream().map(field -> new ContributeProjectFieldEntity(field)).collect(Collectors.toList()))
                .content(content)
                .lyrics(lyrics)
                .adoptFlag(false)
                .uploadFilePath(uploadFilePath)
                .build();
    }
}
