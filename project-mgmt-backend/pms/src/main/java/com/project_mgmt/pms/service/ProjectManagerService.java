package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Project;
import com.project_mgmt.pms.data.ProjectManager;
import com.project_mgmt.pms.repository.ProjectManagerRepository;
import com.project_mgmt.pms.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ProjectManagerService {
@Autowired
    private ProjectRepository projectRepository;

public Project createProject(Project project){
    return projectRepository.save(project);
}

}
