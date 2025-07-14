package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.data.Location;
import com.project_mgmt.pms.data.Proposal;
import com.project_mgmt.pms.repository.EmployeeRepository;
import com.project_mgmt.pms.repository.LocationRepository;
import com.project_mgmt.pms.repository.ProposalRepositry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProposalService {

    private final ProposalRepositry proposalRepository;
    private final EmployeeRepository employeeRepository;
    private final LocationRepository locationRepository;

    public List<Proposal> getAllProposals() {
        return proposalRepository.findAll();
    }

    public List<Proposal> filterByProposer(String empId) {
        Optional<Employee> employee = employeeRepository.findById(empId);
        return employee
                .map(proposalRepository::findByProposer)
                .orElse(Collections.emptyList());
    }

    public Proposal updateProposalStatus(int proposalId, String newStatus) {
        Optional<Proposal> proposalOpt = proposalRepository.findById(proposalId);
        if (proposalOpt.isEmpty()) return null;

        Proposal proposal = proposalOpt.get();
        proposal.setProposalStatus(newStatus);
        proposal.setPropsalStatusDate(new Date());
        return proposalRepository.save(proposal);
    }

    public Proposal updateProposalFeedback(int proposalId, String feedback) {
        Proposal proposal = proposalRepository.findById(proposalId).get();
        proposal.setProposalFeedback(feedback); // Saves feedback text
        return proposalRepository.save(proposal);
    }

    public Map<String, Long> generateProposalSummary() {
        List<Proposal> proposals = proposalRepository.findAll();
        Map<String, Long> summary = new HashMap<>();

        proposals.forEach(p -> {
            summary.merge(p.getProposalStatus(), 1L, Long::sum);
        });

        return summary;
    }

    public Proposal proposeLocation(Location location, Proposal proposal, String proposerId) {
        Location savedLoc = locationRepository.save(location);

        Optional<Employee> proposer = employeeRepository.findById(proposerId);
        proposer.ifPresent(proposal::setProposer);

        proposal.setLocation(savedLoc);
        proposal.setProposalDate(new Date());
        return proposalRepository.save(proposal);
    }
}
