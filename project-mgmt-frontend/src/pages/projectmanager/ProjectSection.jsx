import React, { useState, useEffect } from "react";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
    projectCategory: "",
    projectTargetBudget: "",
    projectTargetDate: ""
  });

  // Hardcoded for now — replace with dynamic ID if needed
  const managerId = 1;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    const today = new Date().toISOString().split("T")[0];

    const newProject = {
      projectName: form.projectName,
      projectDescription: form.projectDescription,
      projectCategory: form.projectCategory,
      projectTargetBudget: parseFloat(form.projectTargetBudget),
      projectTargetDate: form.projectTargetDate,
      projectStartDate: today,
      projectStatus: "Pending",
      projectEndDate: null,
      projectSaving: 0.0,
      feedback: ""
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/project-managers/${managerId}/projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProject)
        }
      );

      if (res.ok) {
        const saved = await res.json();
        setProjects((prev) => [...prev, saved]);
        setForm({
          projectName: "",
          projectDescription: "",
          projectCategory: "",
          projectTargetBudget: "",
          projectTargetDate: ""
        });
      } else {
        console.error("Failed to save project:", res.status);
      }
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Project Manager – Projects</h2>

      {/* ➕ Create Project Form */}
      <div className="bg-white rounded shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold">Create New Project</h3>

        {[
          { label: "Project Name", name: "projectName" },
          { label: "Project Description", name: "projectDescription", textarea: true },
          { label: "Project Category", name: "projectCategory" },
          { label: "Target Budget", name: "projectTargetBudget", type: "number" },
          { label: "Target Date", name: "projectTargetDate", type: "date" }
        ].map(({ label, name, textarea, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {textarea ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            )}
          </div>
        ))}

        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Project
        </button>
      </div>

      {/* 📋 View All Projects */}
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <h3 className="font-semibold mb-3">
          All Projects ({projects.length})
        </h3>
        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Name",
                "Description",
                "Category",
                "Target Budget",
                "Saving",
                "Start Date",
                "Target Date",
                "End Date",
                "Status"
              ].map((col) => (
                <th key={col} className="p-2 border">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((p, i) => (
                <tr key={i}>
                  <td className="p-2 border">{p.projectName}</td>
                  <td className="p-2 border">{p.projectDescription}</td>
                  <td className="p-2 border">{p.projectCategory}</td>
                  <td className="p-2 border">{p.projectTargetBudget}</td>
                  <td className="p-2 border">{p.projectSaving ?? "-"}</td>
                  <td className="p-2 border">{p.projectStartDate}</td>
                  <td className="p-2 border">{p.projectTargetDate}</td>
                  <td className="p-2 border">{p.projectEndDate ?? "-"}</td>
                  <td className="p-2 border">{p.projectStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-400 p-4">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectSection;
