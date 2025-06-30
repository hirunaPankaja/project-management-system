package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Location;
import com.project_mgmt.pms.data.Outlet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OutletRepository extends JpaRepository<Outlet,Integer> {
    Optional<Outlet> findByLocation(Location location);
}
