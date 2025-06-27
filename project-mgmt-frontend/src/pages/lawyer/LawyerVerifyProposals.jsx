import React, { useState } from 'react';

const sampleProposals = [
  {
    id: 1,
    proposal_name: 'Skyview Towers',
    area: 'Colombo 07',
    district: 'Colombo',
    province: 'Western',
    latitude: '6.9271',
    longitude: '79.8612',
    proposer: 'Yasith Fernando',
    propose_date: '2025-06-23',
    rent_fee: 120000,
    property_owner_name: 'Mr. Silva',
    property_owner_contact_no: '0771234567',
    legal_note: '',
    verified: false,
    flagged: false
  },
  {
    id: 2,
    proposal_name: 'Seaside Villas',
    area: 'Galle',
    district: 'Galle',
    province: 'Southern',
    latitude: '6.0535',
    longitude: '80.2210',
    proposer: 'Kasun Perera',
    propose_date: '2025-06-10',
    rent_fee: 95000,
    property_owner_name: 'Mrs. Karunaratne',
    property_owner_contact_no: '0719876543',
    legal_note: 'Verified: Title deed reviewed and matches zoning policy.',
    verified: true,
    flagged: false
  }
];

const LawyerVerifyProposals = () => {
  const [proposals, setProposals] = useState(sampleProposals);
  const [selected, setSelected] = useState(null);

  const updateProposal = (id, updates) => {
    setProposals(prev =>
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    );
    setSelected(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Legal Proposal Verification</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proposals.map(p => (
          <div key={p.id} onClick={() => setSelected(p)}
            className={`cursor-pointer border-l-4 ${
              p.verified ? 'border-green-500' : p.flagged ? 'border-red-500' : 'border-gray-300'
            } bg-white p-4 shadow rounded-md hover:shadow-lg transition`}>
            <h3 className="text-lg font-semibold text-gray-800">{p.proposal_name}</h3>
            <p className="text-sm text-gray-600">Area: {p.area}</p>
            <p className="text-sm text-gray-600">District: {p.district}</p>
            <p className="text-sm text-gray-600">Province: {p.province}</p>
            <p className="text-sm text-gray-600">Proposer: {p.proposer}</p>
            <p className="text-sm text-gray-600">Date: {p.propose_date}</p>
            {p.legal_note && (
              <p className="text-sm mt-1 text-green-700 italic">Note: {p.legal_note}</p>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg relative shadow-xl">
            <button onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600">×</button>
            <h3 className="text-xl font-bold mb-4 text-purple-700">{selected.proposal_name}</h3>

            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Area:</strong> {selected.area}</p>
              <p><strong>District:</strong> {selected.district}</p>
              <p><strong>Province:</strong> {selected.province}</p>
              <p><strong>Latitude:</strong> {selected.latitude}</p>
              <p><strong>Longitude:</strong> {selected.longitude}</p>
              <p><strong>Proposer:</strong> {selected.proposer}</p>
              <p><strong>Proposal Date:</strong> {selected.propose_date}</p>
              <p><strong>Rent Fee:</strong> Rs. {selected.rent_fee.toLocaleString()}</p>
              <p><strong>Owner Name:</strong> {selected.property_owner_name}</p>
              <p><strong>Owner Contact:</strong> {selected.property_owner_contact_no}</p>
            </div>

            <textarea
              placeholder="Enter legal note (optional)"
              value={selected.legal_note}
              onChange={e => setSelected({ ...selected, legal_note: e.target.value })}
              className="mt-4 w-full border rounded px-3 py-2 text-sm resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-5 justify-end">
              <button
                onClick={() =>
                  updateProposal(selected.id, {
                    verified: true,
                    flagged: false,
                    legal_note: selected.legal_note
                  })
                }
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Mark as Verified
              </button>
              <button
                onClick={() =>
                  updateProposal(selected.id, {
                    flagged: true,
                    verified: false,
                    legal_note: selected.legal_note
                  })
                }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Flag for Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerVerifyProposals;
