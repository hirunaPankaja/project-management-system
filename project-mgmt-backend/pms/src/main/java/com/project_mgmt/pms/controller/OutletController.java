package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Outlet;
import com.project_mgmt.pms.service.OutletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/outlet")
@RequiredArgsConstructor
public class OutletController {

    private final OutletService outletService;

    @GetMapping("/all")
    public ResponseEntity<List<Outlet>> viewOutletAll() {
        return ResponseEntity.ok(outletService.viewOutletAll());
    }

    @GetMapping("/analysis")
    public ResponseEntity<Map<String, Object>> viewOutAnalysis() {
        return ResponseEntity.ok(outletService.viewOutAnalysis());
    }

    @GetMapping("/{outletId}")
    public ResponseEntity<Outlet> getOutletById(@PathVariable int outletId) {
        return outletService.getOutletById(outletId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
