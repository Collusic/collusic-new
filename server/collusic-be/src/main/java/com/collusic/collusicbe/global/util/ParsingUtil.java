package com.collusic.collusicbe.global.util;

import javax.servlet.http.HttpServletRequest;

public class ParsingUtil {

    public static String getRemoteAddress(HttpServletRequest request) {
        return (null != request.getHeader("X-FORWARDED-FOR")) ? request.getHeader("X-FORWARDED-FOR") : request.getRemoteAddr();
    }
}
