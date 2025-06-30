// src/pages/AssignTaskPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getProjectDashboard,
    getDesignerEmployeeSummaries,
    getArchitectureEmployeeSummaries,
    assignTask,
} from "../services/employeeApi";

export default function AssignTaskPage({ managerType: initialManagerType }) {
    const { projectId, taskId } = useParams();
    const [project, setProject] = useState(null);
    const [task, setTask] = useState(null);
    const [workers, setWorkers] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState("");
    const [managerType, setManagerType] = useState(initialManagerType);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");
        const storedManagerType = localStorage.getItem("jobRole") || initialManagerType;
        setManagerType(storedManagerType);

        getProjectDashboard(projectId)
            .then((res) => {
                setProject(res.data);
                const found = res.data.tasks.find((t) => t.taskId === parseInt(taskId));
                setTask(found);
            })
            .catch((err) => setErrorMsg("Failed to load project."))
            .finally(() => setLoading(false));

        if (storedManagerType === "design_manager") {
            getDesignerEmployeeSummaries()
                .then((res) => setWorkers(res.data))
                .catch(() => setErrorMsg("Failed to load employees."));
        } else if (storedManagerType === "architecture_manager") {
            getArchitectureEmployeeSummaries()
                .then((res) => setWorkers(res.data))
                .catch(() => setErrorMsg("Failed to load employees."));
        }
    }, [projectId, taskId, initialManagerType]);

    const getRoleType = () => {
        if (managerType === "design_manager") return "designer";
        if (managerType === "architecture_manager") return "architecture";
        return "";
    };

    const handleAssign = () => {
        setAssigning(true);
        setSuccessMsg("");
        setErrorMsg("");
        assignTask(taskId, getRoleType(), selectedWorker)
            .then(() => {
                setSuccessMsg("Assigned successfully!");
                setSelectedWorker("");
            })
            .catch(() => setErrorMsg("Failed to assign task."))
            .finally(() => setAssigning(false));
    };

    if (loading || !project || !task)
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                <span className="ml-4 text-lg text-gray-600">Loading...</span>
            </div>
        );

    const alreadyHasVersion =
        managerType === "design_manager"
            ? task.designVersions?.length > 0
            : managerType === "architecture_manager"
            ? task.architectureVersions?.length > 0
            : false;

    return (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
            <h1 className="text-3xl font-extrabold mb-2 text-emerald-700 flex items-center gap-2">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h6m-6 0V7a4 4 0 00-8 0v4m0 0H3m3 0v6a4 4 0 004 4h4a4 4 0 004-4v-6"></path>
                </svg>
                {project.projectName}
            </h1>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Task: <span className="text-emerald-600">{task.taskTitle}</span>
            </h2>
            <p className="mb-4 text-gray-700 italic">{task.taskDescription}</p>

            {errorMsg && (
                <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">{errorMsg}</div>
            )}
            {successMsg && (
                <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded">{successMsg}</div>
            )}

            {alreadyHasVersion ? (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-2">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>
                        {managerType === "design_manager"
                            ? "Design version already exists. Cannot reassign."
                            : "Architecture version already exists. Cannot reassign."}
                    </span>
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mb-2 mt-4">Assign Worker</h3>
                    <div className="mb-4">
                        <select
                            value={selectedWorker}
                            onChange={(e) => setSelectedWorker(e.target.value)}
                            className="border border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200 p-2 rounded w-full transition"
                        >
                            <option value="">Select employee</option>
                            {workers.map((emp) => (
                                <option key={emp.empId} value={emp.empId}>
                                    {emp.firstName} {emp.lastName} ({emp.empId})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleAssign}
                        disabled={!selectedWorker || assigning}
                        className={`mt-2 w-full bg-emerald-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-emerald-700 transition ${
                            (!selectedWorker || assigning) && "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        {assigning ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Assigning...
                            </span>
                        ) : (
                            "Assign"
                        )}
                    </button>
                </>
            )}
        </div>
    );
}
