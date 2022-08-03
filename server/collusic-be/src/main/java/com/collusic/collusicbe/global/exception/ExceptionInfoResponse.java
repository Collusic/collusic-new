package com.collusic.collusicbe.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExceptionInfoResponse {

    private final String status;
    private final String message;
}