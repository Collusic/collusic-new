package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.contributeproject.ContributeProject;
import com.collusic.collusicbe.domain.contributeproject.ContributeProjectRepository;
import com.collusic.collusicbe.domain.requestproject.RequestProject;
import com.collusic.collusicbe.domain.requestproject.RequestProjectRepository;
import com.collusic.collusicbe.util.StringUtils;
import com.collusic.collusicbe.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.domain.Sort.Order.desc;

@RequiredArgsConstructor
@Service
public class RequestProjectService {

    private final RequestProjectRepository requestProjectRepository;
    private final ContributeProjectRepository contributeProjectRepository;
    private final S3Service s3Service;

    @Transactional
    public RequestProjectResponseDto save(RequestProjectSaveRequestDto requestProjectSaveRequestDto) throws IOException {
        String uploadFilePath = s3Service.upload(requestProjectSaveRequestDto.getMultipartFile(), "static");
        requestProjectSaveRequestDto.setUploadFilePath(uploadFilePath);
        RequestProject savedRequestProejct = requestProjectRepository.save(requestProjectSaveRequestDto.toEntity());
        return new RequestProjectResponseDto(savedRequestProejct);
    }

    @Transactional
    public RequestProjectResponseDto update(Long requestProjectId, RequestProjectUpdateRequestDto requestProjectUpdateRequestDto) throws IOException {
        RequestProject requestProject = requestProjectRepository.findById(requestProjectId)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + requestProjectId));
        String savedFileName = StringUtils.extractFileNameFromFilePath(requestProject.getUploadFilePath());
        String uploadFilePath = s3Service.update(requestProjectUpdateRequestDto.getMultipartFile(), "static", savedFileName);
        requestProjectUpdateRequestDto.setUploadFilePath(uploadFilePath);
        requestProject.update(requestProjectUpdateRequestDto);
        return new RequestProjectResponseDto(requestProject);
    }

    @Transactional
    public RequestProjectResponseDto findById(Long requestProjectId) {
        RequestProject requestProject = requestProjectRepository.findById(requestProjectId)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + requestProjectId));

        return new RequestProjectResponseDto(requestProject);
    }

    @Transactional
    public void delete(Long requestProjectId) throws RuntimeException {
        RequestProject requestProject = requestProjectRepository.findById(requestProjectId)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + requestProjectId));
        List<ContributeProject> savedContributeProjects = contributeProjectRepository.findByRequestProjectId(requestProject.getId());
        if(!savedContributeProjects.isEmpty()) {
            throw new RuntimeException("요청작 삭제 불가");
        }
        requestProjectRepository.delete(requestProject);
    }

    @Transactional
    public RequestProjectsWithPaginationDto getRequestProjectsWithPagination(Pageable pageable) {
        Page<RequestProject> all = requestProjectRepository.findAll(pageable);
        List<RequestProjectResponseDto> requestProjectResponseDtos = all.getContent().stream().map(requestProject -> new RequestProjectResponseDto(requestProject)).collect(Collectors.toList());
        int totalPages = all.getTotalPages();
        return new RequestProjectsWithPaginationDto(requestProjectResponseDtos, totalPages);
    }

    @Transactional
    public RequestProjectDetailPageDto getRequestProjectWithContributeProjects(Long requestProjectId) {
        RequestProject requestProject = requestProjectRepository.findById(requestProjectId)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + requestProjectId));
        List<ContributeProject> savedContributeProjects = contributeProjectRepository.findAllByRequestProjectId(requestProjectId, Sort.by(desc("createdDate")));
        List<ContributeProjectResponseDto> contributeProjectResponseDtos = savedContributeProjects.stream().map(contributeProject -> new ContributeProjectResponseDto(contributeProject)).collect(Collectors.toList());
        return new RequestProjectDetailPageDto(requestProject, contributeProjectResponseDtos);
    }
}
