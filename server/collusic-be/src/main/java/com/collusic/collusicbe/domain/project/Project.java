package com.collusic.collusicbe.domain.project;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.state.State;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Project extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROJECT_ID")
    private Long id;

    @Size(min = 1, max = 20)
    @Column(length = 20, nullable = false)
    private String projectName;

    @Column(nullable = false)
    @Min(30)
    @Max(240)
    private int bpm;

    @Column(nullable = false)
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private State projectState;
}
