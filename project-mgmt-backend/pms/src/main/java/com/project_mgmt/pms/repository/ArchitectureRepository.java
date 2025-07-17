package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Architecture;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArchitectureRepository extends JpaRepository<Architecture,String> {

    @Query("SELECT a.empId FROM Architecture a")
    List<String> findAllEmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT a.empId FROM Architecture a)")
    List<Employee>findAllArchitectureEmployees();

    List<Architecture>findAll();
}
