package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Lawyer;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LawyerRepository extends JpaRepository<Lawyer,String> {

    @Query("SELECT l.empId FROM Lawyer l")
    List<String> findAllEmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT l.empId FROM Lawyer l)")
    List<Employee> findAllLawyerEmployees();

    List<Lawyer> findAll();
}
