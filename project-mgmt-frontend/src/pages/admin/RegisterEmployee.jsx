import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../services/employeeApi";
import "react-toastify/dist/ReactToastify.css";

function RegisterEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    nic: "",
    phoneNumber: "",
    jobRole: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.nic ||
      !formData.phoneNumber ||
      !formData.jobRole
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await register(formData); // sending formData without password
      toast.success("Employee registered successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        nic: "",
        phoneNumber: "",
        jobRole: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <ToastContainer />

      <h1 className="text-2xl font-bold">Register Employee</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* NIC */}
        <div>
          <label className="block text-sm font-medium">NIC</label>
          <input
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Job Role */}
        <div>
          <label className="block text-sm font-medium">Job Role</label>
          <select
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="lawyer">Lawyer</option>
            <option value="designer">Designer</option>
            <option value="architecture">Architecture</option>
             <option value="project-manager">Project Manager</option>
            <option value="design-manager">Design Manager</option>
            <option value="architecture-manager">Architecture Manager</option>
            <option value="civil-engineer">Civil Engineer</option>
            <option value="property-officer">Property Officer</option>    
            <option value="property-manager">Property Manager</option>
            <option value="property-executive">Property Executive</option> 
                    
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterEmployee;
