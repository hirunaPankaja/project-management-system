package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.ArchitectureManager;
import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.data.PropertyOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArchitectureManagerRepository extends JpaRepository<ArchitectureManager,String> {

    @Query("SELECT a.empId FROM ArchitectureManager a")
    List<String> findAllEmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT a.empId FROM ArchitectureManager a)")
    List<Employee> findAllArchitectureManagerEmployees();

    List<ArchitectureManager> findAll();
}
