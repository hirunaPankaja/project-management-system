package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Integer> {
}
