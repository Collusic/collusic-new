package com.collusic.collusicbe.web.dto;

import java.util.List;

public class RequestProjectsWithPaginationDto {
    private List<RequestProjectResponseDto> requestProjectResponseDtos;
    private int totalPages;

    public RequestProjectsWithPaginationDto(List<RequestProjectResponseDto> requestProjectResponseDtos, int totalPages) {
        this.requestProjectResponseDtos = requestProjectResponseDtos;
        this.totalPages = totalPages;
    }
}
