// src/pages/MyProposals.jsx
import { useEffect, useState } from "react";
import { filterProposalsByProposer } from "../../services/employeeApi";

export default function MyProposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const empId = localStorage.getItem("empId");
    filterProposalsByProposer(empId).then((res) => {
      setProposals(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Proposals</h1>
      <ul className="space-y-2">
        {proposals.map((p) => (
          <li
            key={p.proposalId}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="font-semibold">{p.proposalName}</h2>
            <p className="text-gray-600">{p.proposalDescription}</p>
            <p className={`mt-2 font-medium ${p.proposalFeedback ? "text-green-600" : "text-gray-500"}`}>
              {p.proposalFeedback || "No feedback yet"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
