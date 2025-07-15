import React, { useEffect, useState } from 'react';
import { getAllProposals } from '../../services/employeeApi'; // Using your existing service

const PropertyOfficerFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Using your existing API service
        const response = await getAllProposals();
        
        // Process the data
        const proposalsWithFeedback = response.data
          .filter(proposal => proposal.proposalFeedback?.trim())
          .map(proposal => ({
            proposalName: proposal.proposalName || "Unnamed Proposal",
            comment: proposal.proposalFeedback,
            date: proposal.propsalStatusDate?.substring(0, 10) || "No date"
          }));
        
        setFeedbackList(proposalsWithFeedback);
      } catch (error) {
        console.error("Error loading feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) return <div className="p-8">Loading feedback...</div>;
  if (!feedbackList.length) return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Proposal Feedback</h2>
      <p>No feedback available yet.</p>
    </div>
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Proposal Feedback</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbackList.map((fb, index) => (
          <div key={index} className="bg-white border border-gray-200 shadow rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{fb.proposalName}</h3>
            <p className="text-sm text-gray-600">{fb.comment}</p>
            <p className="text-xs text-gray-400 mt-3 text-right">{fb.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyOfficerFeedback;