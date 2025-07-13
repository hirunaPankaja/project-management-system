import { useEffect, useState } from "react";
import { filterProposalsByProposer } from "../../services/employeeApi";
import PropertyOfficerProposal from "./PropertyOfficerProposal"; // Adjust the import path

export default function MyProposals() {
  const [proposals, setProposals] = useState([]);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const empId = localStorage.getItem("empId");

  const [loading, setLoading] = useState(false);

  // Then in your loadProposals:
  const loadProposals = async () => {
  setLoading(true);
  try {
    const res = await filterProposalsByProposer(empId);
    setProposals(res.data);
  } catch (error) {
    console.error("Failed to load proposals:", error);
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  const handleProposalSubmit = () => {
    setSubmissionSuccess(true);
    setShowProposalForm(false);
    loadProposals();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmissionSuccess(false);
    }, 3000);
  };

  {showProposalForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
    <div 
      className="absolute inset-0" 
      onClick={() => setShowProposalForm(false)}
    ></div>
    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 animate-[fadeIn_0.3s] relative z-10">
      <PropertyOfficerProposal 
        onClose={() => setShowProposalForm(false)}
        onSubmitSuccess={handleProposalSubmit}
        empId={empId}
      />
    </div>
  </div>
)}

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Proposals</h1>
        <button
          onClick={() => setShowProposalForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Proposal
        </button>
      </div>

      {submissionSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Proposal submitted successfully!
        </div>
      )}

      {proposals.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          You haven't submitted any proposals yet.
        </div>
      ) : (
        <ul className="space-y-2">
          {proposals.map((p) => (
            <li
              key={p.proposalId}
              className="border p-4 rounded hover:bg-gray-50"
            >
              <h2 className="font-semibold">{p.proposalName}</h2>
              <p className="text-gray-600">{p.proposalDescription}</p>
              <p
                className={`mt-2 font-medium ${
                  p.proposalFeedback
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {p.proposalFeedback || "No feedback yet"}
              </p>
            </li>
          ))}
        </ul>
      )}

      {showProposalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 animate-[fadeIn_0.3s]">
            <PropertyOfficerProposal 
              onClose={() => setShowProposalForm(false)}
              onSubmitSuccess={handleProposalSubmit}
              empId={empId}
            />
          </div>
        </div>  
      )}
    </div>
  );
}