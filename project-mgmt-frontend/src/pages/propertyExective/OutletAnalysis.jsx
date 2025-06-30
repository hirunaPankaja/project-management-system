// src/pages/OutletAnalysis.jsx
import { useEffect, useState } from "react";
import { getOutletAnalysis } from "../../services/employeeApi";
import { Bar } from "react-chartjs-2";

export default function OutletAnalysis() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    getOutletAnalysis().then((res) => setAnalysis(res.data));
  }, []);

  if (!analysis) return null;

  const data = {
    labels: Object.keys(analysis.statusCounts || {}),
    datasets: [
      {
        label: "# of Outlets",
        data: Object.values(analysis.statusCounts || {}),
        backgroundColor: ["#38a169", "#d69e2e", "#dd6b20", "#e53e3e"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Outlet Analysis</h1>
      <p>Total Outlets: {analysis.totalOutlets}</p>
      <div className="max-w-xl mx-auto mt-6">
        <Bar data={data} />
      </div>
    </div>
  );
}
