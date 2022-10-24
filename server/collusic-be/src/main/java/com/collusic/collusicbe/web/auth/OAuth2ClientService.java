package com.collusic.collusicbe.web.auth;

import java.util.Map;

public interface OAuth2ClientService {
    OAuth2Response requestLogin(Map<String, String> authCode);
}
