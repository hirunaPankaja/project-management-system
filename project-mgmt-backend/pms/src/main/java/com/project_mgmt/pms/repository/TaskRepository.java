package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {
    List<Task> findByProject_ProjectId(Long projectId);
    List<Task> findByDesigner_EmpIdOrArchitecturer_EmpId(String designerId, String architecturerId);

}
