package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.ProcurementManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcurementManagerRepository extends JpaRepository<ProcurementManager,String> {
}
