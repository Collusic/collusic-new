package com.collusic.collusicbe.domain.project;

import com.collusic.collusicbe.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<ProjectLike, Long> {

    @Query("select pl from ProjectLike pl where pl.project.id = :projectId and pl.member.id = :memberId")
    Optional<ProjectLike> findLikesByProjectIdAndMemberId(Long projectId, Long memberId);

    @Query("select count(pl) from ProjectLike pl where pl.project.id = :projectId")
    Long countByProjectId(Long projectId);

    boolean existsByMemberAndProject(Member member, Project project);

}
