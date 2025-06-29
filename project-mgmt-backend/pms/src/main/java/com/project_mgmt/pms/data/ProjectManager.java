package com.project_mgmt.pms.data;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="project_manager")
public class ProjectManager extends Employee{
    private String filedVisitLocation;
    private Date filedVisitDate;
}
