package com.collusic.collusicbe.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {

    private static final String IMAGE_DIR = "profiles";
    private static final String RESIZED_IMAGE_DIR = "resized-profiles";
    private static final String TRACK_DIR = "tracks";
    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.cloudfront.domain}")
    private String cloudFrontDomain;

    public String upload(String nickname, @ModelAttribute MultipartFile multipartFile) throws IOException {
        StringBuilder path = new StringBuilder();
        path.append(IMAGE_DIR)
            .append("/")
            .append(nickname)
            .append(".png");

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());

        s3Client.putObject(new PutObjectRequest(bucket, path.toString(), multipartFile.getInputStream(), objectMetadata)
                                   .withCannedAcl(CannedAccessControlList.PublicRead));

        return cloudFrontDomain + path;
    }

    private String update(File uploadFile, String dirName, String savedFileName) {
        String fileName = dirName + "/" + uploadFile.getName();
        if (isExist(savedFileName)) {
            s3Client.deleteObject(bucket, savedFileName);
        }
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    private String putS3(File uploadFile, String fileName) {
        s3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return s3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    private boolean isExist(String fileName) {
        return s3Client.doesObjectExist(bucket, fileName);
    }

    public String getPath(String type) {
        String path = cloudFrontDomain + "/";
        if (type.equals("resized")) {
            return path + RESIZED_IMAGE_DIR;
        }
        return path + IMAGE_DIR;
    }

    public String uploadAudioFile(MultipartFile audioFile) throws IOException {
        StringBuilder path = new StringBuilder();
        path.append("/")
            .append(TRACK_DIR)
            .append("/")
            .append(LocalDateTime.now())
            .append("-")
            .append(audioFile.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(audioFile.getContentType());
        objectMetadata.setContentLength(audioFile.getSize());

        s3Client.putObject(new PutObjectRequest(bucket, path.toString(), audioFile.getInputStream(), objectMetadata)
                                   .withCannedAcl(CannedAccessControlList.PublicRead));

        return cloudFrontDomain + path;
    }

}
