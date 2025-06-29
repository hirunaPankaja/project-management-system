package com.project_mgmt.pms.data;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "head_of_department")
public class HeadOfDepartment extends Employee{
    private String industryVisitLocation;
    private Date industryVisitDate;
}
