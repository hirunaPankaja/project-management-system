package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.ProjectManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectManagerRepository extends JpaRepository<ProjectManager, String> {
}
