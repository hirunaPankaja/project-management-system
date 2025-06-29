package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee")
@Inheritance(strategy = InheritanceType.JOINED)
public class Employee {
    @Id
    protected String empId;

    protected String firstName;
    protected String lastName;
    protected String address;
    protected String phoneNumber;
    protected String email;
    private String password;
    protected Date startDate;
    protected String nic;

    @Lob
    @Column(name = "profile_picture")
    protected byte[] profilePicture;
}
