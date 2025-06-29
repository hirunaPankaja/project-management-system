package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SupplierRepository extends JpaRepository<Supplier, Long> {
        Supplier findByEmail(String email);
        boolean existsByEmail(String email);
    }


