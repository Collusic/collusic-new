package com.collusic.collusicbe.global.exception.jwt;

public class AbnormalAccessException extends RuntimeException {

    public AbnormalAccessException(String message) {
        super(message);
    }
}