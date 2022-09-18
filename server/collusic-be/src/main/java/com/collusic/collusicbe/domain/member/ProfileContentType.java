package com.collusic.collusicbe.domain.member;

public enum ProfileContentType {
    JPEG("jpeg"),
    JPG("jpg"),
    PNG("png");

    private final String type;

    ProfileContentType(String type) {
        this.type = type;
    }

    public static boolean isImageType(String inputType) {
        for (ProfileContentType contentType : values()) {
            if (inputType.contains(contentType.type)) {
                return true;
            }
        }
        return false;
    }
}