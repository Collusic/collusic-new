package com.collusic.collusicbe.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class ExceptionDetailResponse {

    private final String field;
    private final String value;
    private final String message;

    public static List<ExceptionDetailResponse> of(String field, String value, String message) {
        List<ExceptionDetailResponse> fieldErrors = new ArrayList<>();
        fieldErrors.add(new ExceptionDetailResponse(field, value, message));
        return fieldErrors;
    }

    public static List<ExceptionDetailResponse> from(BindingResult bindingResult) {
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        return fieldErrors.stream()
                          .map(error -> new ExceptionDetailResponse(
                                  error.getField(),
                                  error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
                                  error.getDefaultMessage() == null ? "" : error.getDefaultMessage()))
                          .collect(Collectors.toList());
    }
}