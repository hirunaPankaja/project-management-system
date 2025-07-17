package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.DesignManager;
import com.project_mgmt.pms.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignManagerRepository extends JpaRepository<DesignManager,String> {
    @Query("SELECT d.empId FROM DesignManager d")
    List<String>findAllmployeeIds();

    @Query("SELECT e FROM Employee e WHERE e.empId IN(SELECT d.empId FROM DesignManager d)")
    List<Employee> findAllDesignManagerEmployees();

    List<DesignManager> findAll();
}
