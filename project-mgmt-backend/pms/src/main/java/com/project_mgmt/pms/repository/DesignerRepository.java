package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Designer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DesignerRepository extends JpaRepository<Designer,String> {
    @Query("SELECT a.empId FROM Designer a")
    List<String> findAllEmployeeIds();
}
