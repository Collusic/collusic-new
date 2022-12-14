package com.collusic.collusicbe.domain.project;

import com.collusic.collusicbe.domain.member.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ProjectLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROJECT_LIKE_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Builder
    public ProjectLike(Member member, Project project) {
        this.member = member;
        this.project = project;
        project.addLike(this);
    }

    public void setMember(Member member) {
        this.member = member;
    }
    public void setProject(Project project) {
        this.project = project;
    }
}
