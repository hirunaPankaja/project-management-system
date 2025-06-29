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
@Table(name = "design_pool")
public class DesignPool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int designId;
    private String designType;
    private String designStatus;
    private byte[] designFile;
    private Date designLastUpdateDate;

    @ManyToOne
    @JoinColumn(name = "outlet_id", referencedColumnName = "outletId")
    private Outlet outlet;
}
