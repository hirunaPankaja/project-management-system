package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.PropertyExecutive;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyExecutiveRepository extends JpaRepository<PropertyExecutive,String> {
    @Query("SELECT p.empId FROM PropertyExecutive p")
    List<String> findAllEmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT p.empId FROM PropertyExecutive p)")
    List<Employee> findAllPropertyExecutiveEmployees();

    List<PropertyExecutive> findAll();
}
