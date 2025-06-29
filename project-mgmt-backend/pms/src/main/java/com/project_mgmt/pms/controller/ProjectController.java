package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Project;
import com.project_mgmt.pms.dto.ProjectDashboardDTO;
import com.project_mgmt.pms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/projects")
@CrossOrigin
public class ProjectController {

    @Autowired
    private  ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDashboardDTO> getDashboard(@PathVariable Long projectId) {
        ProjectDashboardDTO dto = service.getProjectDashboard(projectId);
        return ResponseEntity.ok(dto);
    }
    @GetMapping("all")
    public List<Project> getAllProjects() {
        return service.viewProject();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return service.getProject(id);
    }
}
