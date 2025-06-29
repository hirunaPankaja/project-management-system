package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.DesignVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignVersionRepository extends JpaRepository<DesignVersion,Integer> {
    List<DesignVersion> findByTask_TaskId(int taskId);
}
