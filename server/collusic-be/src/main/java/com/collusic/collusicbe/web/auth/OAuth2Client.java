package com.collusic.collusicbe.web.auth;

import java.util.Map;

public interface OAuth2Client {
    OAuth2Response requestLogin(Map<String, Object> authCode);
}
