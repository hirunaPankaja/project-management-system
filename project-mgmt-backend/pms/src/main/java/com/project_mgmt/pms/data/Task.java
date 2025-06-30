package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    //project
    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "projectId")
    private Project project;

    @OneToOne
    @JoinColumn(name = "designer_id", referencedColumnName = "empId")
    private Employee designer;

    @OneToOne
    @JoinColumn(name = "architecturer_id", referencedColumnName = "empId")
    private Employee architecturer;
}
