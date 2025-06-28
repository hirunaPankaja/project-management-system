package com.example.project_pms.service;

import com.example.project_pms.data.Project;
import com.example.project_pms.data.ProjectManager;
import com.example.project_pms.repository.ProjectManagerRepository;
import com.example.project_pms.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ProjectManagerService {

    private final ProjectManagerRepository managerRepo;
    private final ProjectRepository projectRepo;

    public ProjectManagerService(ProjectManagerRepository managerRepo, ProjectRepository projectRepo) {
        this.managerRepo = managerRepo;
        this.projectRepo = projectRepo;
    }

    public Project createProject(Long managerId, Project project) {
        ProjectManager manager = managerRepo.findById(managerId).orElseThrow();
        project.setProjectManager(manager);
        project.setProjectStartDate(LocalDate.now());
        project.setProjectStatus("Pending");
        return projectRepo.save(project);
    }
}
