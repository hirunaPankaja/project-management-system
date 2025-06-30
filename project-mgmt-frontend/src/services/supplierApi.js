import axios from "axios";

const supplierAPI = "http://localhost:8082/supplier";
const productAPI = "http://localhost:8082/supplier/product";

// Supplier Auth Endpoints
export const registerSupplier = (supplierData) => {
  return axios.post(`${supplierAPI}/register`, supplierData);
};

export const loginUser = (credentials) => {
  return axios.post(`${supplierAPI}/login`, null, {
    params: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};

// Product Endpoints
export const addProducts = (payload) => {
  return axios.post(`${productAPI}/add`, payload);
};

export const viewProducts = (supplierId) => {
  return axios.get(`${productAPI}/view/${supplierId}`);
};

// Optional: Add these if needed
export const updateProduct = (productId, productData) => {
  return axios.put(`${productAPI}/update/${productId}`, productData);
};

export const deleteProduct = (productId) => {
  return axios.delete(`${productAPI}/delete/${productId}`);
};