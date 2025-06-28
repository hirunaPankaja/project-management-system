package com.example.project_pms.controller;

import com.example.project_pms.data.Project;
import com.example.project_pms.service.ProjectManagerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project-managers")
@CrossOrigin
public class ProjectManagerController {

    private final ProjectManagerService service;

    public ProjectManagerController(ProjectManagerService service) {
        this.service = service;
    }

    @PostMapping("/{managerId}/projects")
    public Project createProject(@PathVariable Long managerId, @RequestBody Project project) {
        return service.createProject(managerId, project);
    }
}
