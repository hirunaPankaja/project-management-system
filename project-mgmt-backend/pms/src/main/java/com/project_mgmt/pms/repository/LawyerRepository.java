package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LawyerRepository extends JpaRepository<Lawyer,String> {
}
