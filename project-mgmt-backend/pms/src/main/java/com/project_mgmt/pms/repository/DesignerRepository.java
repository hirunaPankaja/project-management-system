package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Designer;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignerRepository extends JpaRepository<Designer,String> {
    @Query("SELECT a.empId FROM Designer a")
    List<String> findAllEmployeeIds();

    // New method to get full Employee entities (needed for getEmployeesByRole)
    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT d.empId FROM Designer d)")
    List<Employee> findAllDesignerEmployees();

    // Alternative approach if you want to return Designer entities directly:
    List<Designer> findAll();
}
