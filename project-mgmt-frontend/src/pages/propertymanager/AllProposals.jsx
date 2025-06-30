// src/pages/AllProposals.jsx
import { useEffect, useState } from "react";
import {
  getAllProposals,
  updateProposalStatus
} from "../../services/employeeApi";

export default function AllProposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllProposals();
    setProposals(res.data);
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateProposalStatus(id, newStatus);
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Proposals</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map(p => (
            <tr key={p.proposalId} className="border-t">
              <td className="p-2">{p.proposalName}</td>
              <td className="p-2">{p.proposalStatus}</td>
              <td className="p-2">
                <select
                  value={p.proposalStatus}
                  onChange={(e) => handleStatusChange(p.proposalId, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="approve">Approve</option>
                  <option value="hold">Hold</option>
                  <option value="reject">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
