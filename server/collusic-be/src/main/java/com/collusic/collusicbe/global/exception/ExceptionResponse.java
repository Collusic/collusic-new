package com.collusic.collusicbe.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class ExceptionResponse {

    private final String message;
    private final int status;
    private final List<ExceptionDetailResponse> fieldErrors;

    public static ExceptionResponse of(String message, int status, BindingResult bindingResult) {
        return new ExceptionResponse(message, status, ExceptionDetailResponse.from(bindingResult));
    }

    public static ExceptionResponse of(MethodArgumentTypeMismatchException e) {
        String value = e.getValue() == null ? "" : e.getValue().toString();
        List<ExceptionDetailResponse> errors = ExceptionDetailResponse.of(e.getName(), value, e.getErrorCode());
        return new ExceptionResponse(HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value(), errors);
    }
}