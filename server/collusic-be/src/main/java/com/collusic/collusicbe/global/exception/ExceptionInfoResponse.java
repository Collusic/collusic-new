package com.collusic.collusicbe.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ExceptionInfoResponse {

    private final String status;
    private final String message;

    public static ExceptionInfoResponse from(String status, String message) {
        return new ExceptionInfoResponse(status, message);
    }
}