package com.project_mgmt.pms.data;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;


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

    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "empId")
    private Employee manager;

}
