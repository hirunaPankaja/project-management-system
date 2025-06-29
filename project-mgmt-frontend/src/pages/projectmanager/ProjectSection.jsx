import React, { useState, useEffect } from "react";
import { createProject, getAllProjects } from "../../services/employeeApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
    projectCategory: "",
    projectTargetBudget: "",
    projectTargetDate: "",
  });

  // Get managerId (empId) from localStorage as string
  const managerId = localStorage.getItem("empId");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects:", err);
      toast.error("Failed to fetch projects.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    if (
      !form.projectName ||
      !form.projectDescription ||
      !form.projectCategory ||
      !form.projectTargetBudget ||
      !form.projectTargetDate
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    const today = new Date().toISOString().split("T")[0];

    const payload = {
      projectName: form.projectName,
      projectDescription: form.projectDescription,
      projectCategory: form.projectCategory,
      projectTargetBudget: parseFloat(form.projectTargetBudget),
      projectTargetDate: form.projectTargetDate,
      projectStartDate: today,
      projectStatus: "Pending",
      projectEndDate: null,
      projectSaving: 0,
      feedback: "",
      manager: {
        empId: managerId,
      },
    };

    try {
      const res = await createProject(payload);
      setProjects((prev) => [...prev, res.data]);
      toast.success("Project created!");

      setForm({
        projectName: "",
        projectDescription: "",
        projectCategory: "",
        projectTargetBudget: "",
        projectTargetDate: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-4">Project Manager – Projects</h2>

      {/* Create Project Form */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold mb-2">Create New Project</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              name="projectCategory"
              value={form.projectCategory}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Target Budget</label>
            <input
              type="number"
              name="projectTargetBudget"
              value={form.projectTargetBudget}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Target Date</label>
            <input
              type="date"
              name="projectTargetDate"
              value={form.projectTargetDate}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="projectDescription"
              value={form.projectDescription}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            ></textarea>
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={loading}
          className={`bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Add Project"}
        </button>
      </div>

      {/* Project List Table */}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h3 className="text-lg font-semibold mb-4">
          All Projects ({projects.length})
        </h3>

        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Target Budget</th>
              <th className="p-2 border">Target Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.projectId}>
                <td className="border p-2">{proj.projectName}</td>
                <td className="border p-2">{proj.projectCategory}</td>
                <td className="border p-2">{proj.projectTargetBudget}</td>
                <td className="border p-2">{proj.projectTargetDate}</td>
                <td className="border p-2">{proj.projectStatus}</td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No projects found.
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
