import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getProjectDashboard } from "../services/employeeApi";

Chart.register(...registerables);

export default function ProjectDetails() {
  const { projectId } = useParams();
  const ganttChartRef = useRef(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectDashboard(projectId)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));
  }, [projectId]);

  useEffect(() => {
    if (!project) return;

    const ctx = ganttChartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: project.tasks.map((t) => t.taskTitle),
        datasets: [
          {
            label: "Timeline",
            data: project.tasks.map((t, idx) => ({
              x: [
                new Date(t.taskStartDate),
                new Date(t.dueDate ?? project.projectTargetDate),
              ],
              y: idx,
            })),
            backgroundColor: project.tasks.map((t) =>
              t.taskStatus === "complete"
                ? "rgba(34,197,94,0.7)"
                : t.taskStatus === "ongoing"
                ? "rgba(59,130,246,0.7)"
                : "rgba(234,179,8,0.7)"
            ),
            borderRadius: 4,
            borderSkipped: false,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "month",
              displayFormats: {
                month: "MMM yyyy",
              },
            },
            min: new Date(project.projectStartDate),
            max: new Date(project.projectTargetDate),
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#4B5563",
              font: {
                size: 14,
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const start = context.raw.x[0].toLocaleDateString();
                const end = context.raw.x[1].toLocaleDateString();
                return `Start: ${start} - End: ${end}`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [project]);

  if (!project) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {project.projectName} Details
      </h1>

      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Gantt Timeline
        </h2>
        <div className="h-64">
          <canvas ref={ganttChartRef}></canvas>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {project.tasks.map((task) => {
              const isExpanded = expandedTaskId === task.taskId;
              return (
                <tr key={task.taskId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {task.taskTitle}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {task.taskStartDate?.substring(0, 10)} -{" "}
                    {(task.completeDate ?? task.dueDate)?.substring(0, 10)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    Rs. {task.taskExpendBudget?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.taskStatus === "complete"
                          ? "bg-green-100 text-green-800"
                          : task.taskStatus === "ongoing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.taskStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        setExpandedTaskId(
                          isExpanded ? null : task.taskId
                        )
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Expanded Rows */}
        {project.tasks.map((task) => {
          const isExpanded = expandedTaskId === task.taskId;
          if (!isExpanded) return null;

          return (
            <div
              key={task.taskId}
              className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-sm text-gray-700"
            >
              <h4 className="text-gray-800 font-semibold mb-2">
                Design
              </h4>
              {task.designVersions?.length > 0 ? (
                task.designVersions.map((d) => (
                  <ul key={d.designVersionId} className="mb-4">
                    <li>Start: {d.designStartDate?.substring(0, 10)}</li>
                    <li>End: {d.designEndDate?.substring(0, 10)}</li>
                    <li>Budget: Rs. {d.designExpectedBudget}</li>
                    <li>Status: {d.status}</li>
                  </ul>
                ))
              ) : (
                <p className="text-gray-600">No design versions.</p>
              )}

              <h4 className="text-gray-800 font-semibold mb-2">
                Architecture
              </h4>
              {task.architectureVersions?.length > 0 ? (
                task.architectureVersions.map((a) => (
                  <ul key={a.architectureVersionId}>
                    <li>Start: {a.architectureStartDate?.substring(0, 10)}</li>
                    <li>End: {a.architectureEndDate?.substring(0, 10)}</li>
                    <li>Budget: Rs. {a.architectureExpectedBudget}</li>
                    <li>Status: {a.status}</li>
                  </ul>
                ))
              ) : (
                <p className="text-gray-600">No architecture versions.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
