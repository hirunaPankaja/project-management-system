package com.example.project_pms.service;

import com.example.project_pms.data.Supplier;
import com.example.project_pms.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public Long supplierLogin(String email, String password){
        Supplier supplier = supplierRepository.findByEmail(email);
        if (supplier == null){
            return null;
        }
        if (supplier.getPassword().equals(password)){
            return supplier.getId();
        }

    return null;
    }

    public Supplier supplierRegister(Supplier supplier){
        if(supplierRepository.existsByEmail(supplier.getEmail())){
            throw new IllegalArgumentException("email already registered");
        }
        return supplierRepository.save(supplier);
    }
}
