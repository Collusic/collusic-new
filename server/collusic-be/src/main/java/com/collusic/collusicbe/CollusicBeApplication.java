package com.collusic.collusicbe;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableFeignClients
@EnableEncryptableProperties
public class CollusicBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollusicBeApplication.class, args);
    }

}
