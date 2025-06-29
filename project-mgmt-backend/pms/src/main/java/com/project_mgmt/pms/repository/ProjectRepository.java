package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
