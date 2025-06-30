package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Task;
import com.project_mgmt.pms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*") // adjust as needed for frontend
public class TaskController {

    @Autowired
    private TaskService taskService;


    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }


    @GetMapping
    public List<Task> viewAllTasks() {
        return taskService.viewTask(null);
    }


    @GetMapping("/{empId}")
    public List<Task> getTasksByEmployee(@PathVariable String empId) {
        return taskService.getTask(empId);
    }


    @PutMapping("/{taskId}/assign")
    public void assignTask(
            @PathVariable int taskId,
            @RequestParam String role,
            @RequestParam String empId
    ) {
        taskService.assignTask(taskId, role, empId);
    }


    @PutMapping("/{taskId}")
    public void updateTask(
            @PathVariable int taskId,
            @RequestBody Task task
    ) {
        task.setTaskId(taskId);
        taskService.updateTask(task);
    }
}
