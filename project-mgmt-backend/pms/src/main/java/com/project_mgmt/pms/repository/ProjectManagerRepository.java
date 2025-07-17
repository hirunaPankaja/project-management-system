package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.ProjectManager;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectManagerRepository extends JpaRepository<ProjectManager, String> {

    @Query("SELECT p.empId FROM ProjectManager p")
    List<String> findAllEmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT p.empId FROM ProjectManager p)")
    List<Employee> findAllProjectManagerEmployees();

    List<ProjectManager> findAll();
}
