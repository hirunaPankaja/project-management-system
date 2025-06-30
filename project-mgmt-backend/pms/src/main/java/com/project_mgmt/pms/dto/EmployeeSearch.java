package com.project_mgmt.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeSearch {
    private String empId;
    private String firstName;
    private String lastName;

}

