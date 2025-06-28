import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const sampleProjects = [
  { category: "Architecture", saving: 120000 },
  { category: "Interior", saving: 95000 },
  { category: "Structural", saving: 68000 },
  { category: "Landscape", saving: 47000 }
];

const ProjectDashboard = () => {
  const totalProjects = sampleProjects.length;
  const totalSaving = sampleProjects.reduce((sum, p) => sum + p.saving, 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Project Manager – Dashboard</h2>

      {/* 🧾 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 text-white p-4 rounded shadow">
          <h3 className="text-sm font-semibold">Total Projects</h3>
          <p className="text-xl font-bold">{totalProjects}</p>
        </div>
        <div className="bg-green-600 text-white p-4 rounded shadow">
          <h3 className="text-sm font-semibold">Total Savings</h3>
          <p className="text-xl font-bold">LKR {totalSaving.toLocaleString()}</p>
        </div>
        {/* Add more cards if needed */}
      </div>

      {/* 📊 Savings Chart */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Project Savings by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleProjects}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="saving" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectDashboard;
