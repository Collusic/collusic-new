package com.collusic.collusicbe.domain.upload;

import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@NoArgsConstructor
@Embeddable
public class UploadFile {

    private String uploadFileName;

    private String storeFileName;

    public UploadFile(String uploadFileName, String storeFileName) {
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }
}
