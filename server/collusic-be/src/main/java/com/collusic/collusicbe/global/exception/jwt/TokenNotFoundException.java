package com.collusic.collusicbe.global.exception.jwt;

import io.jsonwebtoken.JwtException;

public class TokenNotFoundException extends JwtException {

    public TokenNotFoundException(String message) {
        super(message);
    }
}
