package com.project_mgmt.pms.data;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import lombok.*;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="property_executive")
public class PropertyExecutive extends Employee{
    private String outletVisitFrequency;
    private Date lastVisitDate;

}
