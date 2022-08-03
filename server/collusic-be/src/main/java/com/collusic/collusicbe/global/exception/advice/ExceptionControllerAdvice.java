package com.collusic.collusicbe.global.exception.advice;

import com.collusic.collusicbe.global.exception.DuplicatedNicknameException;
import com.collusic.collusicbe.global.exception.ExceptionInfoResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DuplicatedNicknameException.class)
    public ExceptionInfoResponse duplicatedNicknameExceptionHandler(DuplicatedNicknameException e) {
        return new ExceptionInfoResponse(HttpStatus.BAD_REQUEST.getReasonPhrase(), e.getMessage());
    }
}