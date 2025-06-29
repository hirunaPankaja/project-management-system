package com.project_mgmt.pms.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private int taskId;
    private String taskTitle;
    private String taskDescription;
    private String taskStatus;
    private double taskSaving;
    private Date dueDate;
    private Date taskStartDate;
    private double taskExpectedBudget;
    private double taskExpendBudget;
    private Date completeDate;

    private List<DesignVersionDTO> designVersions;
    private List<ArchitectureVersionDTO> architectureVersions;
}
