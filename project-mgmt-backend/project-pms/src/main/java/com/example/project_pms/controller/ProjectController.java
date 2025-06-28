package com.example.project_pms.controller;

import com.example.project_pms.data.Project;
import com.example.project_pms.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public Optional<Project> filterProject(@PathVariable Long id) {
        return service.filterProject(id);
    }

    @GetMapping
    public List<Project> viewProject() {
        return service.viewProject();
    }

    @GetMapping("/dashboard")
    public Map<String, Object> generateProjectDashboard() {
        return service.generateProjectDashboard();
    }
}
