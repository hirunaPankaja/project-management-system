// src/pages/AllProposals.jsx
import { useEffect, useState } from "react";
import {
  getAllProposals,
  updateProposalStatus,
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
              <th className="p-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.proposalId} className="border-t hover:bg-gray-50">
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
                <td className="p-2 border">
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
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
