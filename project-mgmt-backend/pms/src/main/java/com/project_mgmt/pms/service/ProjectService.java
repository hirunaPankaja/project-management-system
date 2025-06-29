package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.ArchitectureVersion;
import com.project_mgmt.pms.data.DesignVersion;
import com.project_mgmt.pms.data.Project;
import com.project_mgmt.pms.data.Task;
import com.project_mgmt.pms.dto.ArchitectureVersionDTO;
import com.project_mgmt.pms.dto.DesignVersionDTO;
import com.project_mgmt.pms.dto.ProjectDashboardDTO;
import com.project_mgmt.pms.dto.TaskDTO;
import com.project_mgmt.pms.repository.ArchitectureVersionRepository;
import com.project_mgmt.pms.repository.DesignVersionRepository;
import com.project_mgmt.pms.repository.ProjectRepository;
import com.project_mgmt.pms.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private  TaskRepository taskRepository;
    @Autowired
    private DesignVersionRepository designVersionRepository;
    @Autowired
    private ArchitectureVersionRepository architectureVersionRepository;

    public ProjectDashboardDTO getProjectDashboard(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        List<Task> tasks = taskRepository.findByProject_ProjectId(projectId);

        List<TaskDTO> taskDTOs = tasks.stream().map(task -> {
            List<DesignVersion> designVersions =
                    designVersionRepository.findByTask_TaskId(task.getTaskId());

            List<ArchitectureVersion> architectureVersions =
                    architectureVersionRepository.findByTask_TaskId(task.getTaskId());

            List<DesignVersionDTO> dvDTOs = designVersions.stream()
                    .map(dv -> new DesignVersionDTO(
                            dv.getDesignVersionId(),
                            dv.getDesignDescription(),
                            dv.getDesignExpectedBudget(),
                            dv.getDesignExpendBudget(),
                            dv.getDesignStartDate(),
                            dv.getDesignEndDate(),
                            dv.getStatus(),
                            "/api/files/design-version/" + dv.getDesignVersionFile()
                    )).collect(Collectors.toList());

            List<ArchitectureVersionDTO> avDTOs = architectureVersions.stream()
                    .map(av -> new ArchitectureVersionDTO(
                            av.getArchitectureVersionId(),
                            av.getArchitectureDescription(),
                            av.getArchitectureExpectedBudget(),
                            av.getArchitectureExpendBudget(),
                            av.getArchitectureStartDate(),
                            av.getArchitectureEndDate(),
                            av.getStatus(),
                            "/api/files/architecture-version/" + av.getArchitectureVersionFile()
                    )).collect(Collectors.toList());

            return new TaskDTO(
                    task.getTaskId(),
                    task.getTaskTitle(),
                    task.getTaskDescription(),
                    task.getTaskStatus(),
                    task.getTaskSaving(),
                    task.getDueDate(),
                    task.getTaskStartDate(),
                    task.getTaskExpectedBudget(),
                    task.getTaskExpendBudget(),
                    task.getCompleteDate(),
                    dvDTOs,
                    avDTOs
            );
        }).collect(Collectors.toList());

        return new ProjectDashboardDTO(
                project.getProjectId(),
                project.getProjectName(),
                project.getProjectDescription(),
                project.getProjectCategory(),
                project.getProjectTargetDate(),
                project.getProjectTargetBudget(),
                project.getProjectBudget(),
                project.getProjectStatus(),
                project.getProjectSaving(),
                project.getProjectStartDate(),
                project.getProjectEndDate(),
                project.getFeedback(),
                taskDTOs
        );
    }

    public List<Project> viewProject() {
        return projectRepository.findAll();
    }

    public Project getProject(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + projectId));
    }
}
