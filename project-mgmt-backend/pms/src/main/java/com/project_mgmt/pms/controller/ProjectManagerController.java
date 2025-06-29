package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Project;
import com.project_mgmt.pms.service.ProjectManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project-manager")
@CrossOrigin
public class ProjectManagerController {

    @Autowired
    private ProjectManagerService projectManagerService;
    @PostMapping("/project")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project created = projectManagerService.createProject(project);
        return ResponseEntity.ok(created);
    }
}
