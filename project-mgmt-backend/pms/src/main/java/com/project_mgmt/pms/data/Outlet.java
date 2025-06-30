package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "outlet")
public class Outlet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int outletId;
    private String outletName;
    private String profitStatus;
    private Date openDate;
    private double monthlyProfit;
    private String outletManagerName;
    private String omEmail;
    private String onContactNumber;
    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "locationId")
    private Location location;
}
