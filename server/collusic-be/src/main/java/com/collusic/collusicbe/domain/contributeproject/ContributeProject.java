package com.collusic.collusicbe.domain.contributeproject;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.field.ContributeProjectFieldEntity;
import com.collusic.collusicbe.domain.requestproject.RequestProject;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class ContributeProject extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CONTRIBUTE_PROJECT_ID")
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "REQUEST_PROJECT_ID")
    private RequestProject requestProject;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "CONTRIBUTE_PROJECT_ID")
    private List<ContributeProjectFieldEntity> field;

    @Column(columnDefinition = "TEXT", length = 300, nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT", length = 1500)
    private String lyrics;

    private Boolean adoptFlag;

    @Column(columnDefinition = "TEXT")
    private String uploadFilePath;
}
