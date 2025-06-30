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
      <div className="max-w-md mx-auto">
        <Pie data={chartData} />
      </div>
    </div>
  );
}
