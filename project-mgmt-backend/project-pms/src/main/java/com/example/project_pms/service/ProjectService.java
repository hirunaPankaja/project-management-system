package com.example.project_pms.service;

import com.example.project_pms.data.Project;
import com.example.project_pms.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProjectService {

    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo) {
        this.repo = repo;
    }

    public Optional<Project> filterProject(Long projectId) {
        return repo.findById(projectId);
    }

    public List<Project> viewProject() {
        return repo.findAll();
    }


    public Map<String, Object> generateProjectDashboard() {
        List<Project> all = repo.findAll();

        long completed = all.stream()
                .filter(p -> "Completed".equalsIgnoreCase(p.getProjectStatus()))
                .count();

        double totalSaving = all.stream()
                .mapToDouble(p -> Optional.ofNullable(p.getProjectSaving()).orElse(0.0))
                .sum();

        return Map.of(
                "totalProjects", all.size(),
                "completedProjects", completed,
                "totalSaving", totalSaving
        );
    }
}
