import React, { useState } from "react";

export default function SupplierRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    supplierName: "",
    contact: "",
    email: "",
    companyName: "",
    companyNumber: "",
    companyEmail: "",
    productType: "",
    products: [{ name: "", price: "", image: "" }],
    privateEmail: "",
    password: "",
  });

  const handleChange = (e, index = null, field = null) => {
    const { name, value, files } = e.target;

    if (index !== null && field) {
      const updatedProducts = [...formData.products];
      if (field === "image") {
        updatedProducts[index][field] = files[0] ? URL.createObjectURL(files[0]) : "";
      } else {
        updatedProducts[index][field] = value;
      }
      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: "", price: "", image: "" }],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    alert("Supplier Registered Successfully!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplier & Company Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Supplier Name*</label>
                <input
                  type="text"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Contact Number*</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Business Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Company Name*</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Company Contact Number</label>
                <input
                  type="tel"
                  name="companyNumber"
                  value={formData.companyNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Product Type*</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select Product Type</option>
                <option value="construction">Construction</option>
                <option value="supply">Supply</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {formData.products.map((prod, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Product Name*</label>
                      <input
                        type="text"
                        value={prod.name}
                        onChange={(e) => handleChange(e, index, "name")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Price (LKR)*</label>
                      <input
                        type="number"
                        value={prod.price}
                        onChange={(e) => handleChange(e, index, "price")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Product Image {index === 0 ? '*' : ''}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleChange(e, index, "image")}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                        required={index === 0}
                      />
                    </div>
                  </div>
                  
                  {formData.products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove Product
                    </button>
                  )}
                  
                  {prod.image && (
                    <div className="mt-2">
                      <img src={prod.image} alt="Preview" className="h-20 object-cover rounded" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addProduct}
              className="flex items-center text-emerald-600 hover:text-emerald-800"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Another Product
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Private Email*</label>
                <input
                  type="email"
                  name="privateEmail"
                  value={formData.privateEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">This will be your login email</p>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Stepper Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Supplier Registration</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`flex-1 h-2 rounded-full ${
                step >= s ? "bg-emerald-600" : "bg-gray-300"
              }`}
              aria-label={`Go to step ${s}`}
            />
          ))}
        </div>
      </div>
      
      {/* Form Content */}
      <div className="p-6 md:p-8">
        {renderStep()}
      </div>
      
      {/* Form Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t flex justify-between">
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          className={`px-6 py-2 rounded-md font-medium ${
            step === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
          }`}
          disabled={step === 1}
        >
          Back
        </button>
        
        {step === 3 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Submit Registration
          </button>
        ) : (
          <button
            onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
            className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}