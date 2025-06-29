package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Complain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplainRepository extends JpaRepository<Complain, Integer> {
    List<Complain> findByComplainerEmpIdOrReceiverEmpId(String complainer, String receiver);
}
