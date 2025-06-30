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
@Table(name = "architecture_manager")
public class ArchitectureManager extends Employee{
    private String constructionVisitLocation;
    private Date constructionVisitDate;
}
