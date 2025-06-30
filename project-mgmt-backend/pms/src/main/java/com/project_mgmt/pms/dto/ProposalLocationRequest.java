package com.project_mgmt.pms.dto;

import com.project_mgmt.pms.data.Location;
import com.project_mgmt.pms.data.Proposal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProposalLocationRequest {
    private Proposal proposal;
    private Location location;
}
