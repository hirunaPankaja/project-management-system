package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.PrivateKey;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name = "proposal")
public class Proposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int proposalId;
    private Date proposalDate;
    private String proposalDescription;
    private String proposalName;
    private String proposalStatus;
    private String area;
    private Date propsalStatusDate;
    private String propertyOwnerName;
    private String propertyOwnerContactNo;
    private double rentFee;
    private String proposalFeedback;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "locationId")
    private Location location;
    @ManyToOne
    @JoinColumn(name = "proposer_id", referencedColumnName = "empId")
    private Employee proposer;
}
