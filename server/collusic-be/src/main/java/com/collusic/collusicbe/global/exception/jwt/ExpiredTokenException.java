package com.collusic.collusicbe.global.exception.jwt;

import io.jsonwebtoken.JwtException;

public class ExpiredTokenException extends JwtException {

    public ExpiredTokenException(String message) {
        super(message);
    }
}
