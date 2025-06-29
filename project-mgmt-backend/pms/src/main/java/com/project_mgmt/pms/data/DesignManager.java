package com.project_mgmt.pms.data;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

import lombok.*;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="design_manager")
public class DesignManager extends Employee{
    private String siteSurveyVisitLocation;
    private Date siteSurveyVisitDate;
}
