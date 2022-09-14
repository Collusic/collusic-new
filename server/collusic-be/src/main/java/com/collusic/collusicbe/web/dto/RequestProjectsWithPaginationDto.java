package com.collusic.collusicbe.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class RequestProjectsWithPaginationDto {
    private List<RequestProjectResponseDto> requestProjectResponseDtos;
    private int totalPages;

    public RequestProjectsWithPaginationDto(List<RequestProjectResponseDto> requestProjectResponseDtos, int totalPages) {
        this.requestProjectResponseDtos = requestProjectResponseDtos;
        this.totalPages = totalPages;
    }
}
