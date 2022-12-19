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
    public ContributeProjectResponseDto save(ContributeProjectSaveRequestDto contributeProjectSaveRequestDto, Long requestProjectId) throws IOException {
        String uploadFilePath = s3Service.upload(contributeProjectSaveRequestDto.getMultipartFile(), "static");
        contributeProjectSaveRequestDto.setUploadFilePath(uploadFilePath);
        RequestProject savedRequestProject = requestProjectRepository.findById(requestProjectId)
                                                                     .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + requestProjectId));
        ContributeProject savedContributeProject = contributeProjectRepository.save(contributeProjectSaveRequestDto.toEntity(savedRequestProject));
        return new ContributeProjectResponseDto(savedContributeProject);
    }

    @Transactional
    public ContributeProjectResponseDto saveWithNoMultipartFile(ContributeProjectSaveRequestDto contributeProjectSaveRequestDto, Long requestProjectId) {
        RequestProject savedRequestProject = requestProjectRepository.findById(requestProjectId)
                                                                     .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + requestProjectId));
        ContributeProject savedContributeProject = contributeProjectRepository.save(contributeProjectSaveRequestDto.toEntity(savedRequestProject));
        return new ContributeProjectResponseDto(savedContributeProject);
    }

    @Transactional
    public ContributeProjectResponseDto update(ContributeProjectUpdateRequestDto contributeProjectUpdateRequestDto, Long contributeProjectId) throws IOException {
        ContributeProject contributeProject = contributeProjectRepository.findById(contributeProjectId)
                                                                         .orElseThrow(() -> new IllegalArgumentException("해당 기여작이 없습니다. id=" + contributeProjectId));
        String savedFileName = StringUtils.extractFileNameFromFilePath(contributeProject.getUploadFilePath());
        String uploadFilePath = s3Service.update(contributeProjectUpdateRequestDto.getMultipartFile(), "static", savedFileName);
        contributeProjectUpdateRequestDto.setUploadFilePath(uploadFilePath);
        contributeProject.update(contributeProjectUpdateRequestDto);
        return new ContributeProjectResponseDto(contributeProject);
    }

    @Transactional
    public void delete(Long contributeProjectId) throws RuntimeException {
        ContributeProject savedContributeProject = contributeProjectRepository.findById(contributeProjectId)
                                                                              .orElseThrow(() -> new IllegalArgumentException("해당 기여작이 없습니다. id=" + contributeProjectId));
        if (savedContributeProject.isAdopted()) {
            throw new RuntimeException("채택된 기여작은 삭제할 수 없습니다.");
        }
        contributeProjectRepository.delete(savedContributeProject);
    }

    @Transactional
    public ContributeProjectResponseDto findById(Long contributeProjectId) {
        ContributeProject savedContributeProject = contributeProjectRepository.findById(contributeProjectId)
                                                                              .orElseThrow(() -> new IllegalArgumentException("해당 기여작이 없습니다. id=" + contributeProjectId));
        return new ContributeProjectResponseDto(savedContributeProject);
    }
}
