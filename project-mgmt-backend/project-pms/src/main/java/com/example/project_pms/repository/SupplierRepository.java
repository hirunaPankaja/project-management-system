package com.example.project_pms.repository;

import com.example.project_pms.data.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SupplierRepository extends JpaRepository<Supplier, Long> {
        Supplier findByEmail(String email);
        boolean existsByEmail(String email);
    }


