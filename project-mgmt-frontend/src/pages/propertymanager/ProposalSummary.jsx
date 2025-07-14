// src/pages/ProposalSummary.jsx
import { useEffect, useState } from "react";
import { getProposalSummary, getAllProposals } from "../../services/employeeApi";
import { Pie } from "react-chartjs-2";

export default function ProposalSummary() {
  const [summary, setSummary] = useState({});
  const [proposals, setProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    // Fetch summary data
    getProposalSummary().then((res) => {
      setSummary(res.data);
    });

    // Fetch all proposals
    getAllProposals().then((res) => {
      setProposals(res.data);
      setFilteredProposals(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredProposals(proposals);
    } else {
      const filtered = proposals.filter(
        (p) => p.proposalStatus === selectedStatus
      );
      setFilteredProposals(filtered);
    }
  }, [selectedStatus, proposals]);

  const chartData = {
    labels: Object.keys(summary),
    datasets: [
      {
        data: Object.values(summary),
        backgroundColor: ["#4FD1C5", "#F6AD55", "#F56565", "#9F7AEA", "#4299E1"],
      },
    ],
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status === "all" ? "all" : status);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Proposal Status Summary</h1>
      
      {/* Chart and Status Cards */}
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="w-64 h-64">
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
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-3xl">
          <button
            onClick={() => handleStatusClick("all")}
            className={`bg-white border rounded p-4 shadow text-center ${
              selectedStatus === "all" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
            }`}
          >
            <h2 className="text-lg font-bold text-gray-700">All</h2>
            <p className="text-2xl font-semibold text-blue-600">
              {proposals.length}
            </p>
          </button>
          
          {Object.entries(summary).map(([status, count]) => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={`bg-white border rounded p-4 shadow text-center ${
                selectedStatus === status ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
              }`}
            >
              <h2 className="text-lg font-bold text-gray-700 capitalize">
                {status}
              </h2>
              <p className="text-2xl font-semibold text-blue-600">{count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Proposal Details Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedStatus === "all" 
            ? "All Proposals" 
            : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Proposals`}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 text-left border">Name</th>
                <th className="p-2 text-left border">Description</th>
                <th className="p-2 text-left border">Status</th>
                <th className="p-2 text-left border">Area</th>
                <th className="p-2 text-left border">Proposal Date</th>
                <th className="p-2 text-left border">Owner</th>
                <th className="p-2 text-left border">Rent Fee</th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((p) => (
                <tr key={p.proposalId} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">{p.proposalName}</td>
                  <td className="p-2 border">{p.proposalDescription}</td>
                  <td className="p-2 border capitalize">{p.proposalStatus}</td>
                  <td className="p-2 border">{p.area}</td>
                  <td className="p-2 border">
                    {p.proposalDate?.substring(0, 10)}
                  </td>
                  <td className="p-2 border">{p.propertyOwnerName}</td>
                  <td className="p-2 border">{p.rentFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}