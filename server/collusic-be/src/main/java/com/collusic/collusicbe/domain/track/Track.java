package com.collusic.collusicbe.domain.track;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.project.Project;
import lombok.AccessLevel;
import lombok.Builder;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CREATOR_ID")
    private Member creator;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Column(nullable = false)
    private String fileUrl;

    @Column(nullable = false)
    private int orderInProject;

    @Builder
    public Track(Long id, String trackName, TrackTag trackTag, Member creator, Project project, int orderInProject, String fileUrl) {
        this.id = id;
        this.trackName = trackName;
        this.trackTag = trackTag;
        this.creator = creator;
        this.project = project;
        this.orderInProject = orderInProject;
        this.fileUrl = fileUrl;
    }

    public void changeTrackInfo(String trackName, TrackTag trackTag) {
        this.trackName = trackName;
        this.trackTag = trackTag;
    }

    public void changeOrder(int order) {
        this.orderInProject = order;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public boolean hasSameCreator(Member member) {
        return creator.isSameMember(member);
    }

    public void delete() {
        this.creator = null;
    }

    public boolean isDeleted() {
        return creator == null;
    }
}
