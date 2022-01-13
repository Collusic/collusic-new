package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.requestproject.RequestProjectRepository;
import com.collusic.collusicbe.web.dto.RequestProjectSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class RequestProjectService {

    private final RequestProjectRepository requestProjectRepository;
    private final S3Service s3Service;

    @Transactional
    public Long save(RequestProjectSaveRequestDto requestProjectSaveRequestDto) throws IOException {
        String uploadFilePath = s3Service.upload(requestProjectSaveRequestDto.getMultipartFile(), "static");
        requestProjectSaveRequestDto.setUploadFilePath(uploadFilePath);
        return requestProjectRepository.save(requestProjectSaveRequestDto.toEntity()).getId();
    }
}
