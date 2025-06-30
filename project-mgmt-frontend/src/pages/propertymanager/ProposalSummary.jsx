// src/pages/ProposalSummary.jsx
import { useEffect, useState } from "react";
import { getProposalSummary } from "../../services/employeeApi";
import { Pie } from "react-chartjs-2";

export default function ProposalSummary() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getProposalSummary().then((res) => {
      setSummary(res.data);
    });
  }, []);

  const chartData = {
    labels: Object.keys(summary),
    datasets: [
      {
        data: Object.values(summary),
        backgroundColor: ["#4FD1C5", "#F6AD55", "#F56565", "#9F7AEA"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Proposal Status Summary</h1>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-48 h-48">
          <Pie
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(summary).map(([status, count]) => (
            <div
              key={status}
              className="bg-white border border-gray-200 rounded p-4 shadow text-center"
            >
              <h2 className="text-lg font-bold text-gray-700 capitalize">
                {status}
              </h2>
              <p className="text-2xl font-semibold text-blue-600">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
