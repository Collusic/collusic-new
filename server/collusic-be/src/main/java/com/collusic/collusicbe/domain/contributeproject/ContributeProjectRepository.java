package com.collusic.collusicbe.domain.contributeproject;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContributeProjectRepository extends JpaRepository<ContributeProject, Long> {

    List<ContributeProject> findByRequestProjectId(Long requestProjectId);
}
