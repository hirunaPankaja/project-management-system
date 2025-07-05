package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Complain;
import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.dto.EmployeeSearch;
import com.project_mgmt.pms.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    //log in
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String jobRole
    ) {
        try {
            Map<String, String> response = employeeService.login(email, password, jobRole);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

   //create a complain
    @PostMapping("/complain")
    public ResponseEntity<Complain> makeComplain(
            @RequestParam String title,
            @RequestParam String message,
            @RequestParam String status,
            @RequestParam String complainerId,
            @RequestParam String receiverId
    ) {

        Employee complainer = new Employee();
        complainer.setEmpId(complainerId);

        Employee receiver = new Employee();
        receiver.setEmpId(receiverId);

        Complain savedComplain = employeeService.makeComplains(
                title,
                message,
                status,
                complainer,
                receiver
        );

        return ResponseEntity.ok(savedComplain);
    }

    //
    @GetMapping("/complains")
    public ResponseEntity<List<Complain>> viewComplains(
            @RequestParam String empId
    ) {
        List<Complain> complains = employeeService.viewComplains(empId, empId);
        return ResponseEntity.ok(complains);
    }

    @PutMapping("/{empId}/password")
    public ResponseEntity<Void> changePassword(
            @PathVariable String empId,
            @RequestParam String newPassword
    ) {
        employeeService.changePassword(empId, newPassword);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{empId}/profile-picture")
    public ResponseEntity<Void> updateProfilePicture(
            @PathVariable String empId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            byte[] picture = file.getBytes();
            employeeService.updateProfilePicture(empId, picture);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/architecture")
    public List<EmployeeSearch> getArchitectureEmployeeSummaries() {
        return employeeService.getAllArchitectureEmployeesSummary();
    }

    @GetMapping("/designer")
    public List<EmployeeSearch> getDesignerEmployeeSummaries() {
        return employeeService.getAllDesignerEmployeesSummary();
    }

    // Add these methods to your existing EmployeeController
    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestPasswordReset(
            @RequestParam String email,
            @RequestParam String jobRole
    ) {
        try {
            String otp = employeeService.requestPasswordReset(email, jobRole);
            return ResponseEntity.ok("OTP sent to your email");
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestParam String email,
            @RequestParam String jobRole,
            @RequestParam String otp
    ) {
        try {
            boolean isValid = employeeService.verifyOtp(email, jobRole, otp);
            if (isValid) {
                return ResponseEntity.ok("OTP verified successfully");
            } else {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Invalid OTP");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestParam String email,
            @RequestParam String jobRole,
            @RequestParam String newPassword
    ) {
        try {
            employeeService.resetPassword(email, jobRole, newPassword);
            return ResponseEntity.ok("Password reset successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}
