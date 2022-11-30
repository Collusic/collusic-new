package com.collusic.collusicbe.domain.project;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    @Override
    @Query("select p from Project p left join fetch p.tracks where p.id = :id")
    Optional<Project> findById(UUID id);

    Slice<Project> findAllByOrderByCreatedDate(Pageable pageable);

}
