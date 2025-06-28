package com.project_mgmt.supplier.controller;

import com.project_mgmt.supplier.data.Supplier;
import com.project_mgmt.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @PostMapping("/login")
    public ResponseEntity<Long> supplierLogin(@RequestParam String email, @RequestParam String password) {
        Long userId = supplierService.supplierLogin(email, password);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(userId);
    }


    @PostMapping("/register")
    public Supplier supplierRegister(@RequestBody Supplier supplier){
        return supplierService.supplierRegister(supplier);
    }
}
