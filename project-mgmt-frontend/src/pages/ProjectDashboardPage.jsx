import React, { useEffect, useState } from "react";
import { getProjectDashboard, createTask } from "../services/employeeApi";
import { useParams, useNavigate } from "react-router-dom";

export default function ProjectDashboardPage() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDesc, setNewTaskDesc] = useState("");
    const [newTaskDueDate, setNewTaskDueDate] = useState("");
    const [newTaskExpectBudget, setNewTaskExpectBudget] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProjectDashboard(projectId)
            .then((res) => setProject(res.data))
            .catch((err) => console.error(err));
    }, [projectId]);

    const handleCreateTask = () => {
        const currentDate = new Date().toISOString().split("T")[0];
        const payload = {
            taskTitle: newTaskTitle,
            taskDescription: newTaskDesc,
            dueDate: newTaskDueDate,
            taskStartDate: currentDate,
            taskExpectBudget: newTaskExpectBudget,
            taskStatus: "pending",
            taskSaving: 0,
            project: {
                projectId: projectId
            }
        };

        createTask(payload)
            .then(() => getProjectDashboard(projectId))
            .then((res) => {
                setProject(res.data);
                setNewTaskTitle("");
                setNewTaskDesc("");
                setNewTaskDueDate("");
                setNewTaskExpectBudget("");
                setShowTaskForm(false);
            })
            .catch((err) => console.error(err));
    };

    if (!project) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{project.projectName}</h1>
            <p className="text-gray-600 mb-6">{project.projectDescription}</p>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <button
                    onClick={() => setShowTaskForm((v) => !v)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
                >
                    {showTaskForm ? "Cancel" : "Add Task"}
                </button>
            </div>

            {showTaskForm && (
                <div className="bg-white border rounded-lg shadow p-6 mb-8 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="border p-2 w-full rounded focus:outline-emerald-500"
                        />
                        <textarea
                            placeholder="Task Description"
                            value={newTaskDesc}
                            onChange={(e) => setNewTaskDesc(e.target.value)}
                            className="border p-2 w-full rounded focus:outline-emerald-500"
                        ></textarea>
                        <input
                            type="date"
                            placeholder="Due Date"
                            value={newTaskDueDate}
                            onChange={(e) => setNewTaskDueDate(e.target.value)}
                            className="border p-2 w-full rounded focus:outline-emerald-500"
                        />
                        <input
                            type="number"
                            placeholder="Expected Budget"
                            value={newTaskExpectBudget}
                            onChange={(e) => setNewTaskExpectBudget(e.target.value)}
                            className="border p-2 w-full rounded focus:outline-emerald-500"
                        />
                        <button
                            onClick={handleCreateTask}
                            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 w-full transition"
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.tasks.length === 0 && (
                    <div className="col-span-full text-gray-500 text-center py-8 border rounded-lg bg-gray-50">
                        No tasks yet.
                    </div>
                )}
                {project.tasks.map((task) => (
                    <div
                        key={task.taskId}
                        className="border-2 border-emerald-200 bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition hover:border-emerald-400 flex flex-col"
                        onClick={() => navigate(`/projects/${projectId}/tasks/${task.taskId}`)}
                    >
                        <h3 className="text-lg font-bold mb-1 text-emerald-700">{task.taskTitle}</h3>
                        <p className="text-gray-700 mb-2 flex-1">{task.taskDescription}</p>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Due: {task.dueDate}</span>
                            <span>Budget: ${task.taskExpectBudget}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Add this to your CSS for fade-in animation (optional):
// .animate-fade-in { animation: fadeIn 0.3s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
