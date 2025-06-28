import React, { useState, useEffect } from "react";

const ProjectReport = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch real project data on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.projectName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = () => {
    alert("🧾 Report generated for " + (searchQuery || "all projects"));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Project Report</h2>

      {/* 🔍 Search Bar */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Search Project</label>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter project name"
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Generate Report
        </button>
      </div>

      {/* 📋 Filtered Project List */}
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Project",
                "Description",
                "Category",
                "Budget",
                "Saving",
                "Start",
                "Target",
                "End",
                "Status"
              ].map((header) => (
                <th key={header} className="p-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p, i) => (
                <tr key={i}>
                  <td className="p-2 border">{p.projectName}</td>
                  <td className="p-2 border">{p.projectDescription}</td>
                  <td className="p-2 border">{p.projectCategory}</td>
                  <td className="p-2 border">{p.projectTargetBudget}</td>
                  <td className="p-2 border">{p.projectSaving ?? "-"}</td>
                  <td className="p-2 border">{p.projectStartDate}</td>
                  <td className="p-2 border">{p.projectTargetDate}</td>
                  <td className="p-2 border">{p.projectEndDate || "-"}</td>
                  <td className="p-2 border">{p.projectStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-400 p-4">
                  No matching projects
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectReport;
