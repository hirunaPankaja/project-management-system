package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,String> {

    Optional<Employee> findByEmailAndPassword(String email, String password);

    Optional<Employee> findTopByOrderByEmpIdDesc();
}
