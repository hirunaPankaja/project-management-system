package com.example.project_pms.data;


import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;


    public ProjectManager getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(ProjectManager projectManager) {
        this.projectManager = projectManager;
    }

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private ProjectManager projectManager;

    private String projectName;
    private String projectDescription;
    private String projectCategory;
    private LocalDate projectTargetDate;
    private Double projectTargetBudget;

    private Double projectBudget;
    private String projectStatus = "Pending";
    private Double projectSaving;

    private LocalDate projectStartDate;
    private LocalDate projectEndDate;

    private String feedback;




    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public String getProjectCategory() {
        return projectCategory;
    }

    public void setProjectCategory(String projectCategory) {
        this.projectCategory = projectCategory;
    }

    public LocalDate getProjectTargetDate() {
        return projectTargetDate;
    }

    public void setProjectTargetDate(LocalDate projectTargetDate) {
        this.projectTargetDate = projectTargetDate;
    }

    public Double getProjectTargetBudget() {
        return projectTargetBudget;
    }

    public void setProjectTargetBudget(Double projectTargetBudget) {
        this.projectTargetBudget = projectTargetBudget;
    }

    public Double getProjectBudget() {
        return projectBudget;
    }

    public void setProjectBudget(Double projectBudget) {
        this.projectBudget = projectBudget;
    }

    public String getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(String projectStatus) {
        this.projectStatus = projectStatus;
    }

    public Double getProjectSaving() {
        return projectSaving;
    }

    public void setProjectSaving(Double projectSaving) {
        this.projectSaving = projectSaving;
    }

    public LocalDate getProjectStartDate() {
        return projectStartDate;
    }

    public void setProjectStartDate(LocalDate projectStartDate) {
        this.projectStartDate = projectStartDate;
    }

    public LocalDate getProjectEndDate() {
        return projectEndDate;
    }

    public void setProjectEndDate(LocalDate projectEndDate) {
        this.projectEndDate = projectEndDate;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

}
