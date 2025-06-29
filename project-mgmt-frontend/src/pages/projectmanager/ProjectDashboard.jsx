// src/pages/ProjectDashboard.jsx

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ProjectTile from "../../components/ProjectTile";
import { useNavigate } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend);

export default function ProjectDashboard() {
  const navigate = useNavigate();

  const projects = [
    { projectId: "P001", name: "New Outlet Jaffna", status: "ongoing" },
    { projectId: "P002", name: "Outlet Renovation Colombo", status: "complete" },
    { projectId: "P003", name: "Outlet Upgrade Galle", status: "hold" },
  ];

  const statusCounts = projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "# of Projects",
        data: Object.values(statusCounts),
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>

      <div className="max-w-md mb-8">
        <Pie data={data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectTile
            key={p.projectId}
            project={p}
            onClick={() => navigate(`/project/${p.projectId}`)}
          />
        ))}
      </div>
    </div>
  );
}
