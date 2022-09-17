package com.collusic.collusicbe.util;

public class StringUtils {
    public static String extractFileNameFromFilePath(String filePath) {
        int startIndex = filePath.lastIndexOf("static");
        return filePath.substring(startIndex);
    }
}
