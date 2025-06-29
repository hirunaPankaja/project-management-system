package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "task_log")
public class ProcurementRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    private String requestDescription;
    private Double requestQuantity;
    private Date requestManageDate;
    private String requestStatus;
    private Date requestDate;

    @ManyToOne
    @JoinColumn(name = "requester_id", referencedColumnName = "empId")
    private Employee requester;

    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "empId")
    private Employee manager;

    @OneToMany(mappedBy = "procurementRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProcurementRequestItem> items = new java.util.ArrayList<>();
}
