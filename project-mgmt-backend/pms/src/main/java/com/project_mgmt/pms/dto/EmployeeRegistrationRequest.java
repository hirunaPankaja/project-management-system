package com.project_mgmt.pms.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class EmployeeRegistrationRequest {
    private String empId;

    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private String email;
    private String password;
    private String nic;
    private String jobRole;

}
