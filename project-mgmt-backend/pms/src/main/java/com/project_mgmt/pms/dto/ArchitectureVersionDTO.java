package com.project_mgmt.pms.dto;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArchitectureVersionDTO {
    private int architectureVersionId;
    private String architectureDescription;
    private double architectureExpectedBudget;
    private double architectureExpendBudget;
    private Date architectureStartDate;
    private Date architectureEndDate;
    private String status;
    private String downloadUrl;
}
