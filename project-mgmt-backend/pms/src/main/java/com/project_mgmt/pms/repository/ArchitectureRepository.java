package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Architecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArchitectureRepository extends JpaRepository<Architecture,String> {

    @Query("SELECT a.empId FROM Architecture a")
    List<String> findAllEmployeeIds();
}
