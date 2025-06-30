package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.dto.EmployeeSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    Optional<Employee> findByEmailAndPassword(String email, String password);

    @Query("SELECT new com.project_mgmt.pms.dto.EmployeeSearch(e.empId, e.firstName, e.lastName) FROM Employee e")
    List<EmployeeSearch> findAllEmployeeSummaries();

    Optional<Employee> findTopByOrderByEmpIdDesc();
}
