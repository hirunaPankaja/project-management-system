package com.project_mgmt.pms.dto;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DesignVersionDTO {
    private int designVersionId;
    private String designDescription;
    private double designExpectedBudget;
    private double designExpendBudget;
    private Date designStartDate;
    private Date designEndDate;
    private String status;
    private String downloadUrl;
}
