import { useState } from "react";
import { downloadProjectReport } from "../../services/employeeApi";

export default function DownloadProjectReport() {
  const [projectId, setProjectId] = useState("");

  const handleDownload = async () => {
    if (!projectId) {
      alert("Please enter a Project ID!");
      return;
    }

    try {
      const response = await downloadProjectReport(projectId);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `project_${projectId}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download report", error);
      alert("Error downloading report. Check the Project ID or server.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Download Project Report</h2>
      <input
        type="text"
        placeholder="Enter Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download Report
      </button>
    </div>
  );
}
