import React, { useState } from 'react';

const PropertyOfficerProposal = () => {
  const [formData, setFormData] = useState({
    proposal_name: '',
    area: '',
    propose_date: '',
    rent_fee: '',
    property_owner_name: '',
    property_owner_contact_no: '',
    longitude: '',
    latitude: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Proposal:", formData);
    // TODO: Connect to backend API
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">
          Property Proposal
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="proposal_name" className="text-sm text-gray-700 mb-1">Proposal Name</label>
            <input id="proposal_name" name="proposal_name" value={formData.proposal_name} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="area" className="text-sm text-gray-700 mb-1">Area</label>
            <input id="area" name="area" value={formData.area} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="propose_date" className="text-sm text-gray-700 mb-1">Propose Date</label>
            <input type="date" id="propose_date" name="propose_date" value={formData.propose_date} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rent_fee" className="text-sm text-gray-700 mb-1">Rent Fee (Rs.)</label>
            <input type="number" id="rent_fee" name="rent_fee" value={formData.rent_fee} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="property_owner_name" className="text-sm text-gray-700 mb-1">Owner Name</label>
            <input id="property_owner_name" name="property_owner_name" value={formData.property_owner_name} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="property_owner_contact_no" className="text-sm text-gray-700 mb-1">Owner Contact No.</label>
            <input type="tel" id="property_owner_contact_no" name="property_owner_contact_no" value={formData.property_owner_contact_no} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="longitude" className="text-sm text-gray-700 mb-1">Longitude</label>
            <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="latitude" className="text-sm text-gray-700 mb-1">Latitude</label>
            <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" required />
          </div>

          <div className="md:col-span-2">
            <button type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyOfficerProposal;
