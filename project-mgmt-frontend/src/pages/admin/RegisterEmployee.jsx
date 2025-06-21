import React, { useState } from 'react';

function RegisterEmployee() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: ''
    },
    nic: '',
    phones: [''],
    position: '',
    positionDetails: {}
  });

  const positionFields = {
    admin: {
      adminType: '' // 'system', 'hr'
    },
    lawyer: {
      specialization: '',
      barAssociationId: ''
    },
    designer: {
      designSpecialty: '',
      softwareSkills: []
    },
    engineer: {
      engineeringField: '',
      certifications: []
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...formData.phones];
    newPhones[index] = value;
    setFormData(prev => ({ ...prev, phones: newPhones }));
  };

  const addPhoneField = () => {
    setFormData(prev => ({ ...prev, phones: [...prev.phones, ''] }));
  };

  const handlePositionDetailChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      positionDetails: {
        ...prev.positionDetails,
        [field]: value
      }
    }));
  };

  const renderPositionFields = () => {
    switch(formData.position) {
      case 'admin':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Admin Type</label>
              <select
                value={formData.positionDetails.adminType || ''}
                onChange={(e) => handlePositionDetailChange('adminType', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Select type</option>
                <option value="system">System Admin</option>
                <option value="hr">HR Admin</option>
              </select>
            </div>
          </div>
        );
      case 'lawyer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Specialization</label>
              <input
                type="text"
                value={formData.positionDetails.specialization || ''}
                onChange={(e) => handlePositionDetailChange('specialization', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Bar Association ID</label>
              <input
                type="text"
                value={formData.positionDetails.barAssociationId || ''}
                onChange={(e) => handlePositionDetailChange('barAssociationId', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        );
      // Add other positions similarly
      default:
        return <p>Select a position to see specific fields</p>;
    }
  };

  return (
    <div className="p-1 ">
      <h1 className="text-2xl font-bold mb-3">Register Employee</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Bio Data */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Address Line 1</label>
              <input
                type="text"
                name="address.line1"
                value={formData.address.line1}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Address Line 2</label>
              <input
                type="text"
                name="address.line2"
                value={formData.address.line2}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            {formData.phones.map((phone, index) => (
              <div key={index} className="md:col-span-2">
                <label className="block text-sm font-medium">
                  Phone {index + 1}
                </label>
                <div className="flex">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                  {index === formData.phones.length - 1 && (
                    <button
                      type="button"
                      onClick={addPhoneField}
                      className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side - Position Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Position Information</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium">Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Select position</option>
              <option value="admin">Admin</option>
              <option value="lawyer">Lawyer</option>
              <option value="designer">Designer</option>
              <option value="engineer">Engineer</option>
            </select>
          </div>
          
          {formData.position && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Position Details</h3>
              {renderPositionFields()}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="button"
          onClick={() => console.log(formData)} // Replace with actual submit handler
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register Employee
        </button>
      </div>
    </div>
  );
}

export default RegisterEmployee;