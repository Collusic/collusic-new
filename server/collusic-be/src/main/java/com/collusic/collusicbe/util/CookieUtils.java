package com.collusic.collusicbe.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Optional;

import static com.collusic.collusicbe.util.JWTUtil.REFRESH_TIME;

public class CookieUtils {

    public static void expireCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public static String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = Optional.ofNullable(request.getCookies())
                                   .orElseGet(() -> new Cookie[]{});

        Cookie cookie = Arrays.stream(cookies)
                              .filter(c -> c.getName().equals("refreshToken"))
                              .findFirst()
                              .orElse(new Cookie("refreshToken", null));

        return cookie.getValue();
    }

    public static Cookie setCookieWith(String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setMaxAge(REFRESH_TIME);
        cookie.setSecure(false); // TODO : HTTPS 적용 시 true로 옵션 변경하기
        cookie.setHttpOnly(true);
        return cookie;
    }
}