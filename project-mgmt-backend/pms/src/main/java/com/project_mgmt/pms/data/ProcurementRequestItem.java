package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "procurement_request_item")
public class ProcurementRequestItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    private String itemName;
    private Double itemQuantity;


    @ManyToOne
    @JoinColumn(name = "request_id", referencedColumnName = "requestId")
    private ProcurementRequest procurementRequest;
}
