package com.collusic.collusicbe.global.exception.jwt;

import io.jsonwebtoken.JwtException;

public class AbnormalAccessException extends JwtException {

    public AbnormalAccessException(String message) {
        super(message);
    }
}