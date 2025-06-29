package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DesignVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int designVersionId;
    private String designDescription;
    private byte[] designVersionFile;
    private double designExpectedBudget;
    private double designExpendBudget;
    private Date designStartDate;
    private Date designEndDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "design_id", referencedColumnName = "designId")
    private DesignPool design;

    @ManyToOne
    @JoinColumn(name = "task_id", referencedColumnName = "taskId")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "designer_id", referencedColumnName = "empId")
    private Employee designer;
}
