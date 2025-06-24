import React from 'react';

const feedbackList = [
  {
    proposalName: 'Green Garden Flats',
    comment: 'Well structured. Approved for next phase.',
    date: '2025-06-21'
  },
  {
    proposalName: 'Skyline Residencies',
    comment: 'Awaiting updated documentation and floor plan.',
    date: '2025-06-19'
  }
];

const PropertyOfficerFeedback = () => {
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
