package com.collusic.collusicbe.config.auth;

import org.springframework.security.core.AuthenticationException;

public class CannotSignUpException extends AuthenticationException {

    public static final String DUPLICATED_MEMBER_EXCEPTION_MESSAGE = "이미 가입된 계정이 있습니다.";

    public CannotSignUpException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public CannotSignUpException(String msg) {
        super(msg);
    }

    public CannotSignUpException() {
        super(DUPLICATED_MEMBER_EXCEPTION_MESSAGE);
    }
}