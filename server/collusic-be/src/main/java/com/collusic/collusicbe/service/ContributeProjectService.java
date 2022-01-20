package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.contributeproject.ContributeProject;
import com.collusic.collusicbe.domain.contributeproject.ContributeProjectRepository;
import com.collusic.collusicbe.domain.requestproject.RequestProject;
import com.collusic.collusicbe.domain.requestproject.RequestProjectRepository;
import com.collusic.collusicbe.util.StringUtils;
import com.collusic.collusicbe.web.dto.ContributeProjectResponseDto;
import com.collusic.collusicbe.web.dto.ContributeProjectSaveRequestDto;
import com.collusic.collusicbe.web.dto.ContributeProjectUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ContributeProjectService {

    private final ContributeProjectRepository contributeProjectRepository;
    private final RequestProjectRepository requestProjectRepository;
    private final S3Service s3Service;

    @Transactional
    public ContributeProjectResponseDto save(ContributeProjectSaveRequestDto contributeProjectSaveRequestDto, Long id) throws IOException {
        String uploadFilePath = s3Service.upload(contributeProjectSaveRequestDto.getMultipartFile(), "contributeProjects");
        contributeProjectSaveRequestDto.setUploadFilePath(uploadFilePath);
        RequestProject savedRequestProject = requestProjectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + id));
        ContributeProject savedContributeProject = contributeProjectRepository.save(contributeProjectSaveRequestDto.toEntity(savedRequestProject));
        return new ContributeProjectResponseDto(savedContributeProject);
    }

    @Transactional
    public ContributeProjectResponseDto update(ContributeProjectUpdateRequestDto contributeProjectUpdateRequestDto, Long id) throws IOException {
        ContributeProject contributeProject = contributeProjectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 기여작이 없습니다. id=" + id));
        String savedFileName = StringUtils.extractFileNameFromFilePath(contributeProject.getUploadFilePath());
        String uploadFilePath = s3Service.update(contributeProjectUpdateRequestDto.getMultipartFile(), "contributeProjects", savedFileName);
        contributeProjectUpdateRequestDto.setUploadFilePath(uploadFilePath);
        contributeProject.update(contributeProjectUpdateRequestDto);
        return new ContributeProjectResponseDto(contributeProject);
    }
}
