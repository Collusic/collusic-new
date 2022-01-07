package com.collusic.collusicbe.domain.contributeproject;

import com.collusic.collusicbe.domain.requestproject.RequestProject;
import com.collusic.collusicbe.domain.upload.UploadFile;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class ContributeProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CONTRIBUTE_PROJECT_ID")
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "REQUEST_PROJECT_ID")
    private RequestProject requestProjectId;

    @Column(columnDefinition = "TEXT", length = 300, nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT", length = 1500)
    private String lyrics;

    private Boolean adoptFlag;

    @Embedded
    private UploadFile musicFile;

}
