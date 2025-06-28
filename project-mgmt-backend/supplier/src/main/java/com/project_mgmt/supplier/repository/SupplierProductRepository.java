package com.project_mgmt.supplier.repository;

import com.project_mgmt.supplier.data.SupplierProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierProductRepository extends JpaRepository<SupplierProduct, Long> {
    List<SupplierProduct> findBySupplierId(Long supplierId);
}
