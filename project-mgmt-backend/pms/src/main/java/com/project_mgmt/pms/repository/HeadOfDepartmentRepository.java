package com.project_mgmt.pms.repository;
import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.data.HeadOfDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HeadOfDepartmentRepository extends JpaRepository<HeadOfDepartment,String> {

    @Query("SELECT c.empId FROM HeadOfDepartment c")
    List<String> findAllEmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN (SELECT c.empId FROM HeadOfDepartment c)")
    List<Employee>findAllHeadOfDepartmentEmployees();
}
