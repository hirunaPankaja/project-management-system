// src/components/ProjectTile.jsx

export default function ProjectTile({ project, onClick }) {
  const color = {
    ongoing: "bg-blue-100 text-blue-700",
    complete: "bg-green-100 text-green-700",
    hold: "bg-yellow-100 text-yellow-700",
  }[project.status] || "bg-gray-100 text-gray-700";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg p-4 hover:shadow transition flex justify-between items-center"
    >
      <div>
        <h3 className="text-lg font-bold">{project.name}</h3>
        <p className="text-gray-600 text-sm">Project ID: {project.projectId}</p>
      </div>
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${color}`}
      >
        {project.status}
      </span>
    </div>
  );
}
