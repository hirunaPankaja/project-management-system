package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Location;
import com.project_mgmt.pms.data.Proposal;
import com.project_mgmt.pms.service.ProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proposal")
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;

    @GetMapping("/all")
    public ResponseEntity<List<Proposal>> getAllProposals() {
        return ResponseEntity.ok(proposalService.getAllProposals());
    }

    @GetMapping("/filterByProposer/{empId}")
    public ResponseEntity<List<Proposal>> filterByProposer(@PathVariable String empId) {
        return ResponseEntity.ok(proposalService.filterByProposer(empId));
    }

    @PutMapping("/updateStatus/{proposalId}")
    public ResponseEntity<Proposal> updateProposalStatus(
            @PathVariable int proposalId,
            @RequestParam String newStatus) {
        Proposal proposal = proposalService.updateProposalStatus(proposalId, newStatus);
        if (proposal == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(proposal);
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Long>> generateProposalSummary() {
        return ResponseEntity.ok(proposalService.generateProposalSummary());
    }

    @PostMapping("/proposeLocation/{proposerId}")
    public ResponseEntity<Proposal> proposeLocation(
            @RequestBody Proposal proposal,
            @RequestBody Location location,
            @PathVariable String proposerId) {
        Proposal savedProposal = proposalService.proposeLocation(location, proposal, proposerId);
        return ResponseEntity.ok(savedProposal);
    }

}
