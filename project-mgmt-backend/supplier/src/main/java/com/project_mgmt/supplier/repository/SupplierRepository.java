package com.project_mgmt.supplier.repository;

import com.project_mgmt.supplier.data.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SupplierRepository extends JpaRepository<Supplier, Long> {
        Supplier findByEmail(String email);
        boolean existsByEmail(String email);
    }


