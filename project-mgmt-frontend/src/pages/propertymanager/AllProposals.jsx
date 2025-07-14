// src/pages/AllProposals.jsx
import { useEffect, useState } from "react";
import {
  getAllProposals,
  updateProposalStatus,
  submitProposalFeedback,
} from "../../services/employeeApi";

export default function AllProposals() {
  const [proposals, setProposals] = useState([]);
  const [allProposals, setAllProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setProposals(allProposals);
    } else {
      const filtered = allProposals.filter(
        (p) =>
          p.proposalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.proposalDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProposals(filtered);
    }
  }, [searchTerm, allProposals]);

  const fetchData = async () => {
    const res = await getAllProposals();
    setAllProposals(res.data);
    setProposals(res.data);
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateProposalStatus(id, newStatus);
    fetchData();
  };

  const handleRowClick = (proposal) => {
    setSelectedProposal(proposal);
    setFeedback(proposal.feedback || "");
    setIsModalOpen(true);
  };

  const handleSubmitFeedback = async () => {
    if (!selectedProposal) return;
    
    await submitProposalFeedback(selectedProposal.proposalId, feedback);
    fetchData();
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Proposals</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or description..."
          className="border rounded p-2 w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 text-left border">Name</th>
              <th className="p-2 text-left border">Description</th>
              <th className="p-2 text-left border">Status</th>
              <th className="p-2 text-left border">Area</th>
              <th className="p-2 text-left border">Proposal Date</th>
              <th className="p-2 text-left border">Status Date</th>
              <th className="p-2 text-left border">Owner</th>
              <th className="p-2 text-left border">Owner Contact</th>
              <th className="p-2 text-left border">Rent Fee</th>
              <th className="p-2 text-left border">Feedback</th>
              <th className="p-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr 
                key={p.proposalId} 
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(p)}
              >
                <td className="p-2 border">{p.proposalName}</td>
                <td className="p-2 border">{p.proposalDescription}</td>
                <td className="p-2 border">{p.proposalStatus}</td>
                <td className="p-2 border">{p.area}</td>
                <td className="p-2 border">
                  {p.proposalDate?.substring(0, 10)}
                </td>
                <td className="p-2 border">
                  {p.propsalStatusDate?.substring(0, 10)}
                </td>
                <td className="p-2 border">{p.propertyOwnerName}</td>
                <td className="p-2 border">{p.propertyOwnerContactNo}</td>
                <td className="p-2 border">{p.rentFee}</td>
                <td className="p-2 border max-w-xs truncate">
                  {p.proposalFeedback || "No feedback"}
                </td>
                <td className="p-2 border" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={p.proposalStatus}
                    onChange={(e) =>
                      handleStatusChange(p.proposalId, e.target.value)
                    }
                    className="border rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approve">Approve</option>
                    <option value="hold">Hold</option>
                    <option value="reject">Reject</option>
                    <option value="complete">Complete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedProposal.proposalName}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Description:</h3>
                <p>{selectedProposal.proposalDescription}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status:</h3>
                <p>{selectedProposal.proposalStatus}</p>
              </div>
              <div>
                <h3 className="font-semibold">Area:</h3>
                <p>{selectedProposal.area}</p>
              </div>
              <div>
                <h3 className="font-semibold">Proposal Date:</h3>
                <p>{selectedProposal.proposalDate?.substring(0, 10)}</p>
              </div>
              <div>
                <h3 className="font-semibold">Owner:</h3>
                <p>{selectedProposal.propertyOwnerName}</p>
              </div>
              <div>
                <h3 className="font-semibold">Contact:</h3>
                <p>{selectedProposal.propertyOwnerContactNo}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rent Fee:</h3>
                <p>{selectedProposal.rentFee}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Feedback:</label>
              <textarea
                className="w-full border rounded p-2 h-32"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback about this proposal..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}