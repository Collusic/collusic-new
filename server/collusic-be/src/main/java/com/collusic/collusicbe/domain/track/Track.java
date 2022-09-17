package com.collusic.collusicbe.domain.track;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import com.collusic.collusicbe.domain.state.State;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Track extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRACK_ID")
    private Long id;

    @Column(nullable = false)
    private String trackName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TrackTag trackTag;

    @Column(columnDefinition = "tinyint(1) default 1", nullable = false)
    private boolean editable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Enumerated(EnumType.STRING)
    private Measure measure;

    @Column(nullable = false)
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private State trackState;
}
