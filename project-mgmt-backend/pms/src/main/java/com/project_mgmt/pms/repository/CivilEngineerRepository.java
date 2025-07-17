package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.CivilEngineer;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CivilEngineerRepository extends JpaRepository<CivilEngineer,String> {

    @Query("SELECT c.empId FROM CivilEngineer c")
    List<String>findAllEmpId();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT c.empId FROM CivilEngineer c)")
    List<Employee>findAllCivilEngineerEmployees();

    List<CivilEngineer> findAll();
}
