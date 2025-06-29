package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "architecture_pool")
public class ArchitecturePool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int architectureId;
    private String architectureType;
    private String architectureStatus;
    private byte[] architectureFile;
    private Date architectureLastUpdateDate;

    @ManyToOne
    @JoinColumn(name = "outlet_id", referencedColumnName = "outletId")
    private Outlet outlet;
}
