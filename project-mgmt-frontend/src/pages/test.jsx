import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { NavLink } from 'react-router-dom';

// Register Chart.js components
Chart.register(...registerables);

export default function ProjectDashboard() {
  const ganttChartRef = useRef(null);
  const progressChartRef = useRef(null);
  const resourceChartRef = useRef(null);
  const timelineChartRef = useRef(null);

  useEffect(() => {
    // Gantt-like chart (using horizontal bar chart)
    const ganttCtx = ganttChartRef.current.getContext('2d');
    const ganttChart = new Chart(ganttCtx, {
      type: 'bar',
      data: {
        labels: ['Product Launch', 'Inventory Update', 'Supplier Onboarding', 'Marketing Campaign', 'System Upgrade'],
        datasets: [{
          label: 'Project Timeline',
          data: [
            { x: [new Date('2023-03-01'), new Date('2023-04-15')], y: 0 },
            { x: [new Date('2023-04-01'), new Date('2023-05-10')], y: 1 },
            { x: [new Date('2023-05-15'), new Date('2023-07-20')], y: 2 },
            { x: [new Date('2023-06-01'), new Date('2023-08-30')], y: 3 },
            { x: [new Date('2023-07-01'), new Date('2023-09-15')], y: 4 }
          ],
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',
            'rgba(5, 150, 105, 0.7)',
            'rgba(4, 120, 87, 0.7)',
            'rgba(6, 95, 70, 0.7)',
            'rgba(6, 78, 59, 0.7)'
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(5, 150, 105, 1)',
            'rgba(4, 120, 87, 1)',
            'rgba(6, 95, 70, 1)',
            'rgba(6, 78, 59, 1)'
          ],
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 4,
          barPercentage: 0.5
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'MMM yyyy'
              }
            },
            min: new Date('2023-03-01'),
            max: new Date('2023-10-01')
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const start = context.raw.x[0].toLocaleDateString();
                const end = context.raw.x[1].toLocaleDateString();
                return `Start: ${start} - End: ${end}`;
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });

    // Project progress chart
    const progressCtx = progressChartRef.current.getContext('2d');
    const progressChart = new Chart(progressCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
          data: [35, 45, 20],
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',
            'rgba(234, 179, 8, 0.7)',
            'rgba(239, 68, 68, 0.7)'
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        },
        cutout: '70%'
      }
    });

    // Resource allocation chart
    const resourceCtx = resourceChartRef.current.getContext('2d');
    const resourceChart = new Chart(resourceCtx, {
      type: 'bar',
      data: {
        labels: ['IT', 'Operations', 'Marketing', 'Procurement', 'Finance'],
        datasets: [{
          label: 'Team Members',
          data: [12, 28, 8, 15, 6],
          backgroundColor: 'rgba(5, 150, 105, 0.7)',
          borderColor: 'rgba(5, 150, 105, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    // Project timeline chart
    const timelineCtx = timelineChartRef.current.getContext('2d');
    const timelineChart = new Chart(timelineCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Tasks Completed',
          data: [12, 19, 15, 27, 34, 42, 48],
          fill: true,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });

    return () => {
      ganttChart.destroy();
      progressChart.destroy();
      resourceChart.destroy();
      timelineChart.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Keels Project Dashboard</h1>
          <nav className="flex space-x-4">
            <NavLink to="/home" className="text-emerald-600 hover:text-emerald-800">Home</NavLink>
            <NavLink to="/projects" className="text-gray-600 hover:text-gray-800">Projects</NavLink>
            <NavLink to="/reports" className="text-gray-600 hover:text-gray-800">Reports</NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
            <p className="text-2xl font-bold text-emerald-600 mt-2">14</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Tasks Completed</h3>
            <p className="text-2xl font-bold text-emerald-600 mt-2">128</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Team Members</h3>
            <p className="text-2xl font-bold text-emerald-600 mt-2">69</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">On Budget</h3>
            <p className="text-2xl font-bold text-emerald-600 mt-2">92%</p>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gantt Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Project Timeline (Gantt)</h2>
            <div className="h-80">
              <canvas ref={ganttChartRef}></canvas>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Project Status</h2>
            <div className="h-80">
              <canvas ref={progressChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource Allocation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Resource Allocation</h2>
            <div className="h-64">
              <canvas ref={resourceChartRef}></canvas>
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Progress</h2>
            <div className="h-64">
              <canvas ref={timelineChartRef}></canvas>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}