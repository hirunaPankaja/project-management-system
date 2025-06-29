package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "task_logs")
public class TaskLogs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int taskLogId;
    private Date taskLogDate;
    private String logMessage;

    //task
    @ManyToOne
    @JoinColumn(name = "task_id", referencedColumnName = "taskId")
    private Task task;

    //logger
    @ManyToOne
    @JoinColumn(name = "logger_id", referencedColumnName = "empId")
    private Employee logger;
}
