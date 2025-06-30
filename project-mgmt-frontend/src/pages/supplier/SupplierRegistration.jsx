import React, { useState } from "react";
import { registerSupplier } from "../../services/supplierApi";

const SupplierRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialFormData = {
    supplierName: "",
    supplierContact: "",
    email: "",
    company: "",
    companyAddress: "",
    companyNumber: "",
    serviceCategory: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    setError(null);
    const {
      supplierName,
      supplierContact,
      email,
      company,
      serviceCategory,
      password
    } = formData;

    if (
      !supplierName ||
      !supplierContact ||
      !email ||
      !company ||
      !serviceCategory ||
      !password
    ) {
      setError("Please fill all required fields.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const supplierData = { ...formData };

      await registerSupplier(supplierData);
      setSuccess(true);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center p-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
        <p className="mb-6">Your supplier account has been created.</p>
        <button
          onClick={() => {
            setSuccess(false);
            setFormData(initialFormData);
          }}
          className="bg-emerald-600 text-white px-6 py-2 rounded-md"
        >
          Register Another Supplier
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Supplier Registration</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Supplier Name*"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Contact Number*"
            name="supplierContact"
            type="tel"
            value={formData.supplierContact}
            onChange={handleChange}
            required
          />
          <InputField
            label="Business Email*"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Company Name*"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <InputField
            label="Company Address"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
          />
          <InputField
            label="Company Contact"
            name="companyNumber"
            type="tel"
            value={formData.companyNumber}
            onChange={handleChange}
          />
          <InputField
            label="Service Category*"
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password*"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            helperText="Minimum 8 characters"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
        >
          {isSubmitting ? "Processing..." : "Submit Registration"}
        </button>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  helperText,
  textarea = false
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border rounded-md min-h-[100px]"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border rounded-md"
      />
    )}
    {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
  </div>
);

export default SupplierRegistration;
