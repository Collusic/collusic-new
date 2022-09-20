package com.collusic.collusicbe.global.exception.jwt;

import io.jsonwebtoken.JwtException;

public class ExpiredJwtException extends JwtException {

    public ExpiredJwtException(String message) {
        super(message);
    }
}
