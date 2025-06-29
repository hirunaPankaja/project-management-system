import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";

Chart.register(...registerables);

export default function ProjectDetails() {
  const ganttChartRef = useRef(null);

  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const project = {
    id: "P001",
    name: "New Outlet Jaffna",
    startDate: "2025-07-01",
    expectedEndDate: "2025-12-31",
    tasks: [
      {
        id: 1,
        name: "Foundation",
        startDate: "2025-07-01",
        expectedEndDate: "2025-08-15",
        endDate: "2025-08-10",
        budget: 100000,
        expectedBudget: 95000,
        saving: 5000,
        status: "complete",
        design: {
          startDate: "2025-07-01",
          endDate: "2025-07-10",
          budget: 20000,
          status: "complete",
        },
        architecture: {
          startDate: "2025-07-05",
          endDate: "2025-07-20",
          budget: 30000,
          status: "complete",
        },
      },
      {
        id: 2,
        name: "Structure",
        startDate: "2025-08-16",
        expectedEndDate: "2025-10-15",
        endDate: null,
        budget: 150000,
        expectedBudget: 145000,
        saving: null,
        status: "ongoing",
        design: {
          startDate: "2025-08-16",
          endDate: "2025-08-30",
          budget: 25000,
          status: "ongoing",
        },
        architecture: {
          startDate: "2025-08-20",
          endDate: "2025-09-10",
          budget: 35000,
          status: "pending",
        },
      },
    ],
  };

  useEffect(() => {
    const ctx = ganttChartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: project.tasks.map((t) => t.name),
        datasets: [
          {
            label: "Timeline",
            data: project.tasks.map((t, idx) => ({
              x: [
                new Date(t.startDate),
                new Date(t.expectedEndDate),
              ],
              y: idx,
            })),
            backgroundColor: project.tasks.map((t) =>
              t.status === "complete"
                ? "rgba(34,197,94,0.7)"      // green
                : t.status === "ongoing"
                ? "rgba(59,130,246,0.7)"    // blue
                : "rgba(234,179,8,0.7)"     // yellow
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
            min: new Date(project.startDate),
            max: new Date(project.expectedEndDate),
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#4B5563", // gray-700
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {project.name} Details
      </h1>

      {/* Gantt Chart */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Gantt Timeline
        </h2>
        <div className="h-64">
          <canvas ref={ganttChartRef}></canvas>
        </div>
      </div>

      {/* Task Table */}
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
              const isExpanded = expandedTaskId === task.id;
              return (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {task.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {task.startDate} -{" "}
                    {task.endDate || task.expectedEndDate}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    Rs. {task.budget.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.status === "complete"
                          ? "bg-green-100 text-green-800"
                          : task.status === "ongoing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        setExpandedTaskId(
                          isExpanded ? null : task.id
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
          const isExpanded = expandedTaskId === task.id;
          if (!isExpanded) return null;

          return (
            <div
              key={task.id}
              className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-sm text-gray-700"
            >
              <h4 className="text-gray-800 font-semibold mb-2">
                Design
              </h4>
              <ul className="mb-4">
                <li>
                  Start: {task.design.startDate}
                </li>
                <li>
                  End: {task.design.endDate}
                </li>
                <li>
                  Budget: Rs. {task.design.budget}
                </li>
                <li>Status: {task.design.status}</li>
              </ul>

              <h4 className="text-gray-800 font-semibold mb-2">
                Architecture
              </h4>
              <ul>
                <li>
                  Start: {task.architecture.startDate}
                </li>
                <li>
                  End: {task.architecture.endDate}
                </li>
                <li>
                  Budget: Rs. {task.architecture.budget}
                </li>
                <li>Status: {task.architecture.status}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
