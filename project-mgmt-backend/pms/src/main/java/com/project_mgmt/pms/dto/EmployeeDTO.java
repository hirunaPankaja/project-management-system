package com.project_mgmt.pms.dto;

public record EmployeeDTO(String name, String email) {
    // This record will automatically generate:
    // - final fields
    // - constructor
    // - getters
    // - equals/hashCode
    // - toString
}