package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.data.Task;
import com.project_mgmt.pms.repository.EmployeeRepository;
import com.project_mgmt.pms.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public Task createTask(Task task){
        return taskRepository.save(task);
    }
    public List<Task> viewTask(Task task){
        return taskRepository.findAll();
    }
    public List<Task> getTask(String empId) {
        return taskRepository.findByDesigner_EmpIdOrArchitecturer_EmpId(empId, empId);
    }
    @Transactional
    public void assignTask(int taskId, String role, String empId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        switch (role.toLowerCase()) {
            case "designer" -> task.setDesigner(employee);
            case "architecturer" -> task.setArchitecturer(employee);
            default -> throw new IllegalArgumentException("Invalid role: " + role);
        }

        taskRepository.save(task);
    }

        public void updateTask(Task task) {
            if (task == null || task.getTaskId() == 0) {
                throw new IllegalArgumentException("Task ID is required for update.");
            }


            Task existing = taskRepository.findById(task.getTaskId())
                    .orElseThrow(() -> new IllegalArgumentException("Task not found."));

            // Update fields
            existing.setTaskTitle(task.getTaskTitle());
            existing.setTaskDescription(task.getTaskDescription());
            existing.setTaskStatus(task.getTaskStatus());
            existing.setTaskSaving(task.getTaskSaving());
            existing.setDueDate(task.getDueDate());
            existing.setTaskStartDate(task.getTaskStartDate());
            existing.setTaskExpectedBudget(task.getTaskExpectedBudget());
            existing.setTaskExpendBudget(task.getTaskExpendBudget());
            existing.setCompleteDate(task.getCompleteDate());
            existing.setDesigner(task.getDesigner());
            existing.setArchitecturer(task.getArchitecturer());
            existing.setProject(task.getProject());

            taskRepository.save(existing);
        }
    }


