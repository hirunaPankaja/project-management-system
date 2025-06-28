// src/services/supplierApi.js
import axios from "axios";

const supplierAPI = "http://localhost:8082/supplier";
const productAPI = "http://localhost:8082/supplier/product";

export const loginUser = (credentials) => {
  return axios.post(`${supplierAPI}/login`, null, {
    params: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};

export const addProducts = (payload) => {
  return axios.post(`${productAPI}/add`, payload);
};

export const viewProducts = (supplierId) => {
  return axios.get(`${productAPI}/view/${supplierId}`);
};