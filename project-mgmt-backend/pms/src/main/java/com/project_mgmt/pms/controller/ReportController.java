package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<byte[]> generateProjectReport(@PathVariable Long projectId) {
        try {
            return reportService.generateProjectReport(projectId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}