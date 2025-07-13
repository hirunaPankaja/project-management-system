import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { proposeLocation } from "../../services/employeeApi"; // Adjust the path as needed

const PropertyOfficerProposal = ({ onClose, onSubmitSuccess, empId }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    proposal_name: '',
    area: '',
    propose_date: new Date().toISOString().split('T')[0], // Default to today
    rent_fee: '',
    property_owner_name: '',
    property_owner_contact_no: [''],
    longitude: '',
    latitude: '',
    district: '',
    province: '',
    proposal_description: '',
    proposal_status: 'pending',
    proposal_status_date: new Date().toISOString()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (index, value) => {
    const updatedContacts = [...formData.property_owner_contact_no];
    updatedContacts[index] = value;
    setFormData(prev => ({ ...prev, property_owner_contact_no: updatedContacts }));
  };

  const addContactField = () => {
    setFormData(prev => ({
      ...prev,
      property_owner_contact_no: [...prev.property_owner_contact_no, '']
    }));
  };

  const removeContactField = (index) => {
    const updatedContacts = formData.property_owner_contact_no.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, property_owner_contact_no: updatedContacts }));
  };

  const validateStep1 = () => {
    const requiredFields = [
      formData.proposal_name,
      formData.area,
      formData.propose_date,
      formData.rent_fee,
      formData.property_owner_name,
      formData.property_owner_contact_no[0] // At least first contact number
    ];
    return requiredFields.every(field => field.trim() !== '');
  };

  const validateStep2 = () => {
    const requiredFields = [
      formData.longitude,
      formData.latitude,
      formData.district,
      formData.province
    ];
    return requiredFields.every(field => field.trim() !== '');
  };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1() || !validateStep2()) {
      alert('Please fill all required fields in both steps before submitting.');
      return;
    }

    try {
      // Prepare the data for your API
      const location = {
        longitude: parseFloat(formData.longitude),
        latitude: parseFloat(formData.latitude),
        province: formData.province,
        district: formData.district,
        legalStatus: "Owned",
      };

      const proposal = {
        proposalName: formData.proposal_name,
        proposalDescription: formData.proposal_description,
        proposalStatus: formData.proposal_status,
        proposalDate: new Date(formData.propose_date),
        propsalStatusDate: new Date(),
        propertyOwnerName: formData.property_owner_name,
        propertyOwnerContactNo: formData.property_owner_contact_no.join(','),
        rentFee: parseFloat(formData.rent_fee),
        proposalFeedback: "",
        area: formData.area,
      };

      // Call your API
      await proposeLocation(empId, proposal, location);
      
      // Show success state
      setSubmitted(true);
      
      // Notify parent component
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit proposal. Please try again.");
    }
  };

  const nextStep = () => {
    if (!validateStep1()) {
      alert('Please fill all required fields before proceeding.');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetForm = () => {
    setFormData({
      proposal_name: '',
      area: '',
      propose_date: '',
      rent_fee: '',
      property_owner_name: '',
      property_owner_contact_no: [''],
      longitude: '',
      latitude: '',
      district: '',
      province: ''
    });
    setStep(1);
    setSubmitted(false);
  };

  if (submitted) {
  return (
    <div className="p-6 text-center">
      <div className="text-green-500 text-4xl mb-3">✓</div>
      <h3 className="text-lg font-medium mb-2">Proposal Submitted</h3>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Close
      </button>
    </div>
  );
}

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          New Property Proposal
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
        
        {/* Step indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="proposal_name" className="text-sm text-gray-700 mb-1">Proposal Name*</label>
                <input id="proposal_name" name="proposal_name" value={formData.proposal_name} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="proposal_description" className="text-sm text-gray-700 mb-1">Description*</label>
                <textarea id="proposal_description" name="proposal_description" value={formData.proposal_description} onChange={handleChange}rows={4}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col">
                <label htmlFor="area" className="text-sm text-gray-700 mb-1">Area*</label>
                <input id="area" name="area" value={formData.area} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col">
                <label htmlFor="propose_date" className="text-sm text-gray-700 mb-1">Propose Date*</label>
                <input type="date" id="propose_date" name="propose_date" value={formData.propose_date} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col">
                <label htmlFor="rent_fee" className="text-sm text-gray-700 mb-1">Rent Fee (Rs.)*</label>
                <input type="number" id="rent_fee" name="rent_fee" value={formData.rent_fee} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="property_owner_name" className="text-sm text-gray-700 mb-1">Owner Name*</label>
                <input id="property_owner_name" name="property_owner_name" value={formData.property_owner_name} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-sm text-gray-700 mb-1">Owner Contact Numbers*</label>
                {formData.property_owner_contact_no.map((contact, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => handleContactChange(index, e.target.value)}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 flex-grow"
                      required={index === 0}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeContactField(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addContactField}
                  className="mt-2 text-sm text-green-600 hover:text-green-800 self-start"
                >
                  + Add another contact number
                </button>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="longitude" className="text-sm text-gray-700 mb-1">Longitude*</label>
                <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col">
                <label htmlFor="latitude" className="text-sm text-gray-700 mb-1">Latitude*</label>
                <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col">
                <label htmlFor="district" className="text-sm text-gray-700 mb-1">District*</label>
                <input id="district" name="district" value={formData.district} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="flex flex-col">
                <label htmlFor="province" className="text-sm text-gray-700 mb-1">Province*</label>
                <input id="province" name="province" value={formData.province} onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="md:col-span-2 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition"
                >
                  Submit Proposal
                </button>
              </div>
            </div>
          )}
        </form>
    </div>
  );
};

export default PropertyOfficerProposal;