// src/services/supplierApi.js
import axios from "axios";

const empInfoAPI = "http://localhost:8082";
export const login = (credentials) => {
  return axios.post(`${empInfoAPI}/employee/login`, null, {
    params: {
      email: credentials.email,
      password: credentials.password,
      jobRole: credentials.jobRole,
    },
  });
};

export const createProject = (project) => {
  return axios.post(`${empInfoAPI}/project-manager/project`, project);
};

export const getAllProjects = () => {
  return axios.get(`${empInfoAPI}/projects/all`);
};

export const register = (employeeData) => {
  return axios.post(`${empInfoAPI}/admin/employee`, employeeData);
};

export const searchEmployee = () => {
  return axios.get(`${empInfoAPI}/admin/all`);
};

export const getEmployeeById = (empId) => {
  return axios.get(`${empInfoAPI}/admin/${empId}`);
};

export const deleteEmployeeById = (empId) => {
  return axios.delete(`${empInfoAPI}/admin/${empId}`);
};

export const createTask = (taskData) => {
  return axios.post(`${empInfoAPI}/api/tasks`, taskData);
};

export const getAllTasks = () => {
  return axios.get(`${empInfoAPI}/api/tasks`);
};

export const getTasksByEmployee = (empId) => {
  return axios.get(`${empInfoAPI}/api/tasks/${empId}`);
};

export const assignTask = (taskId, role, empId) => {
  return axios.put(
    `${empInfoAPI}/api/tasks/${taskId}/assign`,
    null,
    {
      params: {
        role,
        empId,
      },
    }
  );
};

export const updateTask = (taskId, taskData) => {
  return axios.put(`${empInfoAPI}/api/tasks/${taskId}`, taskData);
};


export const getArchitectureEmployeeSummaries = () => {
  return axios.get(`${empInfoAPI}/employee/architecture`);
};


export const getDesignerEmployeeSummaries = () => {
  return axios.get(`${empInfoAPI}/employee/designer`);
};

export const getProjectDashboard = (projectId) => {
  return axios.get(`${empInfoAPI}/projects/dash/${projectId}`);
};