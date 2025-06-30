package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/map")
    public ResponseEntity<?> displayOnMap() {
        return ResponseEntity.ok(locationService.displayOnMap());
    }
}
