package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.dto.EmployeeRegistrationRequest;
import com.project_mgmt.pms.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    //register
    @PostMapping("/employee")
    public ResponseEntity<Employee> registerEmployee(@RequestBody EmployeeRegistrationRequest request) {
        Employee savedEmployee = adminService.registerEmployee(request);
        return ResponseEntity.ok(savedEmployee);
    }

    //get employee
    @GetMapping("/{empId}")
    public ResponseEntity<Employee> getEmployee(@PathVariable String empId) {
        Optional<Employee> employee = adminService.serachEmployee(empId);
        return employee
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

   //delete emp
    @DeleteMapping("/{empId}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String empId) {
        adminService.deleteEmployee(empId);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{empId}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String empId) {
        // No implemnt
        return ResponseEntity.notFound().build();
    }
}
