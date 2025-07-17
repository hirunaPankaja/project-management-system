package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Architecture;
import com.project_mgmt.pms.data.PropertyManager;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyManagerRepository extends JpaRepository<PropertyManager,String> {

    @Query("SELECT p.empId FROM PropertyManager p")
    List<String>findAllEmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT p.empId FROM PropertyManager p)")
    List<Employee>findAllPropertyManagerEmployees();

    List<PropertyManager>findAll();
}
