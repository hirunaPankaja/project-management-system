package com.project_mgmt.pms.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDashboardDTO {
    private Long projectId;
    private String projectName;
    private String projectDescription;
    private String projectCategory;
    private LocalDate projectTargetDate;
    private Double projectTargetBudget;
    private Double projectBudget;
    private String projectStatus;
    private Double projectSaving;
    private LocalDate projectStartDate;
    private LocalDate projectEndDate;
    private String feedback;

    private List<TaskDTO> tasks;
}
