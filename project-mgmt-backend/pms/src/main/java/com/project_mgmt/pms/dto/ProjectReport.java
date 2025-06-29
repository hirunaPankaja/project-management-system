package com.project_mgmt.pms.dto;

import com.project_mgmt.pms.data.Employee;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.util.Date;

public class ProjectReport {

    private String projectName;
    private String projectDescription;
    private String projectCategory;
    private LocalDate projectTargetDate;
    private Double projectTargetBudget;
    private Double projectBudget;
    private Double projectSaving;
    private LocalDate projectStartDate;
    private LocalDate projectEndDate;
    private String managerId;

    private int taskId;
    private String taskDescription;
    private String taskTitle;
    private String taskStatus;
    private double taskSaving;
    private Date dueDate;
    private Date taskStartDate;
    private double taskExpectedBudget;
    private double taskExpendBudget;
    private Date completeDate;



}
