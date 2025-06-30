// src/pages/ProjectDashboard.jsx

import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ProjectTile from "../../components/ProjectTile";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../services/employeeApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Chart.register(ArcElement, Tooltip, Legend);

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const statusCounts = projects.reduce((acc, p) => {
    const status = p.projectStatus?.toLowerCase() || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const colors = {
    ongoing: "#3B82F6",
    complete: "#10B981",
    pending: "#F59E0B",
    unknown: "#9CA3AF",
    cancelled: "#EF4444",
  };

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(
          (status) => colors[status] || "#9CA3AF"
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Project Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart + Summary */}
          <div className="bg-white p-6 rounded-lg shadow col-span-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Project Overview
            </h2>
            <div className="flex justify-center">
              <div className="w-40 h-40">
                <Doughnut
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
            </div>
            <div className="text-center mt-4 text-gray-700">
              <p className="text-2xl font-bold">
                {projects.length} Projects
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {Object.entries(statusCounts).map(([status, count]) => (
                <span
                  key={status}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white`}
                  style={{
                    backgroundColor: colors[status] || "#9CA3AF",
                  }}
                >
                  {status} : {count}
                </span>
              ))}
            </div>
          </div>

          {/* Tiles */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <ProjectTile
                key={p.projectId}
                project={{
                  projectId: p.projectId,
                  name: p.projectName,
                  status: p.projectStatus,
                }}
                onClick={() => navigate(`/project/${p.projectId}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
