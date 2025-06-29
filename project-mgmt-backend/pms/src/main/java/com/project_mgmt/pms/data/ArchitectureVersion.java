package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArchitectureVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int architectureVersionId;
    private String architectureDescription;
    private byte[] architectureVersionFile;
    private double architectureExpectedBudget;
    private double architectureExpendBudget;
    private Date architectureStartDate;
    private Date architectureEndDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "architecture_pool_id", referencedColumnName = "architectureId")
    private ArchitecturePool architectureId;

    @ManyToOne
    @JoinColumn(name = "task_id", referencedColumnName = "taskId")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "architecture_id", referencedColumnName = "empId")
    private Employee architecture;
}
