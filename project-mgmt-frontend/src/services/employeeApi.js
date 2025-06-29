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

