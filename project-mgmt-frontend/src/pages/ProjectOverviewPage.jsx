// src/pages/ProjectOverviewPage.jsx

import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/employeeApi";
import { useNavigate } from "react-router-dom";

export default function ProjectOverviewPage() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.projectId}
            className="border border-gray-300 p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/projects/${proj.projectId}`)}
          >
            <h2 className="text-xl font-semibold">{proj.projectName}</h2>
            <p className="text-sm text-gray-600">{proj.projectCategory}</p>
            <p className="mt-2 text-gray-800">{proj.projectDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
