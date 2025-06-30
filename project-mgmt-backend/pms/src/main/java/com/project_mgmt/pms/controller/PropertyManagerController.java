package com.project_mgmt.pms.controller;
import com.project_mgmt.pms.data.Proposal;
import com.project_mgmt.pms.service.ProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/proposal-manager")
@RequiredArgsConstructor
public class PropertyManagerController {

    @Autowired
    private ProposalService proposalService;
    @PutMapping("/updateStatus/{proposalId}")
    public ResponseEntity<Proposal> updateProposalStatus(
            @PathVariable int proposalId,
            @RequestParam String newStatus) {
        Proposal proposal = proposalService.updateProposalStatus(proposalId, newStatus);
        if (proposal == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(proposal);
    }

}
