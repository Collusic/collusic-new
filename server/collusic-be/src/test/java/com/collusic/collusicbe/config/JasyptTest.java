package com.collusic.collusicbe.config;

import org.jasypt.commons.CommonUtils;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEByteEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JasyptTest {

    private PooledPBEStringEncryptor jasyptStringEncryptor;

    private static final String testSecret = "test_secret";
    private static final String rawText = "test";
    private static final String encryptedText = "SjDuT0jdRa9F8UJHbuk+Vg==";

    @BeforeEach
    public void setUp() {
        jasyptStringEncryptor = new PooledPBEStringEncryptor();

        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword(testSecret);
        config.setAlgorithm(StandardPBEByteEncryptor.DEFAULT_ALGORITHM);
        config.setKeyObtentionIterations(1000);
        config.setPoolSize(1);
        config.setProviderName("SunJCE");
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setStringOutputType(CommonUtils.STRING_OUTPUT_TYPE_BASE64);

        jasyptStringEncryptor.setConfig(config);
    }

    @DisplayName("복호화 테스트")
    @Test
    public void decryptTest() {

        String decryptedText = jasyptStringEncryptor.decrypt(encryptedText);

        assertThat(decryptedText).isEqualTo(rawText);
    }

    @DisplayName("암호화 테스트")
    @Test
    public void encryptTest() {

        String encryptedText = jasyptStringEncryptor.encrypt(rawText);
        System.out.println(encryptedText);
        assertThat(jasyptStringEncryptor.decrypt(encryptedText)).isEqualTo(rawText);
    }
}