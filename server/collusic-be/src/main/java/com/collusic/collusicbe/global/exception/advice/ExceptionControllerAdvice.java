package com.collusic.collusicbe.global.exception.advice;

import com.collusic.collusicbe.global.exception.*;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.ConstraintViolationException;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BindException.class)
    public ExceptionResponse methodArgumentNotValidExceptionHandler(BindException e) {
        return ExceptionResponse.of(HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value(), e.getBindingResult());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ExceptionResponse methodArgumentTypeMismatchExceptionHandler(MethodArgumentTypeMismatchException e) {
        return ExceptionResponse.of(e);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DuplicatedNicknameException.class)
    public ExceptionInfoResponse duplicatedNicknameExceptionHandler(DuplicatedNicknameException e) {
        return new ExceptionInfoResponse(HttpStatus.BAD_REQUEST.getReasonPhrase(), e.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnAuthorizedException.class)
    public ExceptionInfoResponse unAuthorizedExceptionHandler(UnAuthorizedException e) {
        return new ExceptionInfoResponse(HttpStatus.UNAUTHORIZED.getReasonPhrase(), e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public Object constraintViolationExceptionHandler(Exception e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public Object illegalExceptionHandler(Exception e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    public Object noSuchElementExceptionHandler(Exception e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ForbiddenException.class)
    public Object forbiddenExceptionHandler(Exception e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(JwtException.class)
    public Object jwtExceptionHandler(Exception e) {
        return new ExceptionInfoResponse(HttpStatus.UNAUTHORIZED.getReasonPhrase(), e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CannotDeleteException.class)
    public Object cannotDeleteExceptionHandler(Exception e) {
        return e.getMessage();
    }
}