// src/services/employeeApi.js
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

export const getLocationsWithNestedData = () => {
  return axios.get(`${empInfoAPI}/api/location/displayOnMap`);
};


export const getAllProposals = () => {
  return axios.get(`${empInfoAPI}/api/proposal/all`);
};

export const filterProposalsByProposer = (empId) => {
  return axios.get(`${empInfoAPI}/api/proposal/filterByProposer/${empId}`);
};

export const updateProposalStatus = (proposalId, newStatus) => {
  return axios.put(
    `${empInfoAPI}/api/proposal/updateStatus/${proposalId}`,
    null,
    {
      params: {
        newStatus,
      },
    }
  );
};

export const getProposalSummary = () => {
  return axios.get(`${empInfoAPI}/api/proposal/summary`);
};




export const getAllOutlets = () => {
  return axios.get(`${empInfoAPI}/api/outlet/all`);
};

export const getOutletAnalysis = () => {
  return axios.get(`${empInfoAPI}/api/outlet/analysis`);
};

export const getOutletById = (outletId) => {
  return axios.get(`${empInfoAPI}/api/outlet/${outletId}`);
};

export const proposeLocation = (proposerId, proposal, location) => {
  return axios.post(
    `${empInfoAPI}/api/proposal/proposeLocation/${proposerId}`,
    { 
      proposal,
      location
    }
  );
};
export const downloadProjectReport = async (projectId) => {
  return axios.get(`http://localhost:8082/api/reports/project/${projectId}`, {
    responseType: "blob", 
  });
};

// Add these to your existing employeeApi.js (at the bottom)
export const requestPasswordReset = async ({ email, jobRole }) => {
  return axios.post(`${empInfoAPI}/employee/request-password-reset`, null, {
    params: {
      email,
      jobRole
    }
  });
};

export const verifyOtp = async ({ email, jobRole, otp }) => {
  return axios.post(`${empInfoAPI}/employee/verify-otp`, null, {
    params: {
      email,
      jobRole,
      otp
    }
  });
};

export const resetPassword = async ({ email, jobRole, newPassword }) => {
  return axios.post(`${empInfoAPI}/employee/reset-password`, null, {
    params: {
      email,
      jobRole,
      newPassword
    }
  });
};