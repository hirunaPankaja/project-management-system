// src/components/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../../services/supplierApi";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      const supplierId = res.data;
      console.log("Supplier ID:", supplierId);
      localStorage.setItem("empId", supplierId);
      localStorage.setItem("jobRole", "supplier");
      localStorage.setItem("firstName", "supplier"); 
      localStorage.setItem("lastName", "supplier");
       localStorage.setItem("supplierId", supplierId);

      localStorage.setItem
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/home/supplier/supplier-dashboard');
      }, 1500);
    } catch (error) {
      toast.error('Login Failed!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Supplier Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-green-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-green-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <ToastContainer />

      </div>
    </div>
  );
};

export default Login;