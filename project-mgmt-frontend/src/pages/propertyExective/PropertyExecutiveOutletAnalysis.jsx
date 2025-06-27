import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#34D399', '#F87171', '#FACC15']; // Profit, Loss, Break-even

const PropertyExecutiveOutletAnalysis = () => {
  const outletStats = [
    { name: 'Golden Arcade', profit: 350000 },
    { name: 'Royal Trade Hub', profit: -120000 },
    { name: 'Sunset Mall', profit: 125000 }
  ];

  const profitSummary = [
    { name: 'Profit', value: 2 },
    { name: 'Loss', value: 1 },
    { name: 'Break-even', value: 0 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Outlet Profit Analysis</h2>

      {/* Pie Chart Summary */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Profit Status Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={profitSummary}
              cx="50%" cy="50%" outerRadius={80}
              dataKey="value" label
            >
              {profitSummary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Profit Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={outletStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(val) => `Rs. ${val / 1000}k`} />
            <Tooltip formatter={(val) => `Rs. ${val.toLocaleString()}`} />
            <Bar dataKey="profit" fill="#4ADE80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PropertyExecutiveOutletAnalysis;
