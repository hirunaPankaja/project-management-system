package com.example.project_pms.repository;

import com.example.project_pms.data.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
