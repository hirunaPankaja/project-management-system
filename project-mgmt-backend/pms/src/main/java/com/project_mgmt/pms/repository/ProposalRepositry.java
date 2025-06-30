package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.data.Location;
import com.project_mgmt.pms.data.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProposalRepositry extends JpaRepository<Proposal,Integer> {
    Optional<Proposal> findByLocation(Location location);
    List<Proposal> findByProposer(Employee proposer);
}
