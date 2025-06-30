package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,String> {
}
