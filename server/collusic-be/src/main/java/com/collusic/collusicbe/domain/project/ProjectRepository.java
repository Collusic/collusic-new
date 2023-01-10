package com.collusic.collusicbe.domain.project;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Override
    @Query("select p from Project p left join fetch p.tracks where p.id = :id")
    Optional<Project> findById(Long id);

    @Query(value = "select * from Project p where (p.modified_date = :modifiedDate and p.project_id < :cursorId) or (p.modified_date < :modifiedDate and p.project_id != :cursorId) order by p.modified_date desc, p.project_id desc limit :numberOfElement", nativeQuery = true)
    List<Project> findAllByOrderByModifiedDate(int numberOfElement, Long cursorId, LocalDateTime modifiedDate);

    @Query(value = "select * from Project p order by p.modified_date desc, p.project_id desc limit :numberOfElement", nativeQuery = true)
    List<Project> findAllByOrderByModifiedDateFirstPage(int numberOfElement);
}