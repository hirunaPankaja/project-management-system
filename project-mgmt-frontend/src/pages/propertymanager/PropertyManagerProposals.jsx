import React, { useState } from 'react';

const sampleProposals = [
  {
    id: 1,
    proposal_name: 'Skyview Towers',
    area: 'Colombo 07',
    propose_date: '2025-06-23',
    proposal_status_date: '2025-06-25',
    proposer: 'Yasith Fernando',
    proposal_status: 'Pending',
    rent_fee: 120000,
    property_owner_name: 'Mr. Silva',
    property_owner_contact_no: '0771234567',
    comment: ''
  },
  {
    id: 2,
    proposal_name: 'Seaside Villas',
    area: 'Galle',
    propose_date: '2025-05-10',
    proposal_status_date: '2025-05-12',
    proposer: 'Kasun Perera',
    proposal_status: 'Approved',
    rent_fee: 95000,
    property_owner_name: 'Mrs. Karunaratne',
    property_owner_contact_no: '0719876543',
    comment: 'Meets all criteria'
  }
];

const statusColors = {
  Approved: 'border-green-400',
  Rejected: 'border-red-400',
  Hold: 'border-orange-400',
  Pending: 'border-gray-300'
};

const PropertyManagerViewProposals = () => {
  const [proposals, setProposals] = useState(sampleProposals);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filters, setFilters] = useState({
    proposer: '',
    area: '',
    date: '',
    month: '',
    status: ''
  });

  const handleStatusUpdate = (id, newStatus) => {
    setProposals(prev =>
      prev.map(p =>
        p.id === id ? { ...p, proposal_status: newStatus } : p
      )
    );
    setSelectedProposal(null);
  };

  const filteredProposals = proposals.filter(p => {
    const matchesProposer = !filters.proposer || p.proposer.toLowerCase().includes(filters.proposer.toLowerCase());
    const matchesArea = !filters.area || p.area.toLowerCase().includes(filters.area.toLowerCase());
    const matchesDate = !filters.date || p.propose_date === filters.date;
    const matchesStatus = !filters.status || p.proposal_status === filters.status;
    const matchesMonth = !filters.month || new Date(p.propose_date).getMonth() + 1 === parseInt(filters.month);
    return matchesProposer && matchesArea && matchesDate && matchesStatus && matchesMonth;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">View All Proposals</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Proposer"
          value={filters.proposer}
          onChange={e => setFilters({ ...filters, proposer: e.target.value })}
          className="border px-3 py-2 rounded-md text-sm"
        />
        <input
          type="text"
          placeholder="Area"
          value={filters.area}
          onChange={e => setFilters({ ...filters, area: e.target.value })}
          className="border px-3 py-2 rounded-md text-sm"
        />
        <input
          type="date"
          value={filters.date}
          onChange={e => setFilters({ ...filters, date: e.target.value })}
          className="border px-3 py-2 rounded-md text-sm"
        />
        <select
          value={filters.month}
          onChange={e => setFilters({ ...filters, month: e.target.value })}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="">Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="">Status</option>
          {['Approved', 'Rejected', 'Hold'].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProposals.map(proposal => (
          <div
            key={proposal.id}
            className={`border-l-4 ${statusColors[proposal.proposal_status]} bg-white shadow-sm rounded-md p-4 hover:shadow-md transition cursor-pointer`}
            onClick={() => setSelectedProposal(proposal)}
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{proposal.proposal_name}</h3>
                <p className="text-xs text-gray-500">{proposal.area}</p>
              </div>
              <span className="text-xs text-gray-400">{proposal.propose_date}</span>
            </div>
            <p className="text-sm text-gray-700"><strong>By:</strong> {proposal.proposer}</p>
            <p className="text-sm text-gray-700"><strong>Status:</strong> {proposal.proposal_status}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedProposal(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-green-700 mb-4">{selectedProposal.proposal_name}</h3>
            <div className="text-sm space-y-1 text-gray-700">
              <p><strong>Area:</strong> {selectedProposal.area}</p>
              <p><strong>Proposer:</strong> {selectedProposal.proposer}</p>
              <p><strong>Proposal Date:</strong> {selectedProposal.propose_date}</p>
              <p><strong>Status:</strong> {selectedProposal.proposal_status}</p>
              <p><strong>Status Date:</strong> {selectedProposal.proposal_status_date}</p>
              <p><strong>Rent Fee:</strong> Rs. {selectedProposal.rent_fee.toLocaleString()}</p>
              <p><strong>Owner Name:</strong> {selectedProposal.property_owner_name}</p>
              <p><strong>Owner Contact:</strong> {selectedProposal.property_owner_contact_no}</p>
              {selectedProposal.comment && (
                <p><strong>Comment:</strong> {selectedProposal.comment}</p>
              )}
            </div>
            <div className="flex gap-3 mt-5 justify-end">
              <button
                onClick={() => handleStatusUpdate(selectedProposal.id, 'Approved')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedProposal.id, 'Rejected')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedProposal.id, 'Hold')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Hold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagerViewProposals;
