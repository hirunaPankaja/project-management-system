package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.ArchitectureVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArchitectureVersionRepository extends JpaRepository<ArchitectureVersion,Integer> {
    List<ArchitectureVersion> findByTask_TaskId(int taskId);
}
