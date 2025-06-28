import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const TaskLogsPage = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    taskTitle: "",
    logMessage: "",
    taskDate: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    taskTitle: "",
    logMessage: "",
    taskDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.taskTitle || !form.logMessage || !form.taskDate) return;

    setTasks([...tasks, form]);
    setForm({ taskTitle: "", logMessage: "", taskDate: "" });
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setEditForm(tasks[index]);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    const updated = [...tasks];
    updated[editingIndex] = editForm;
    setTasks(updated);
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Civil Engineer Task Logs</h2>

      {/* ➕ Add Task Log */}
      <div className="bg-white shadow p-4 space-y-4 rounded">
        <input
          type="date"
          name="taskDate"
          value={form.taskDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Date"
        />
        <input
          type="text"
          name="taskTitle"
          value={form.taskTitle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Task Title"
        />
        <textarea
          name="logMessage"
          value={form.logMessage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Log Message"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Task
        </button>
      </div>

      {/* 📋 View Task Logs */}
      <div className="bg-white shadow-sm rounded p-4 overflow-x-auto">
        <h3 className="font-semibold mb-2">Task History</h3>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Log</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 border">{task.taskDate}</td>
                  <td className="p-2 border">{task.taskTitle}</td>
                  <td className="p-2 border">{task.logMessage}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => openEditModal(idx)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 p-4">No tasks logged yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✏️ Edit Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full p-6 shadow space-y-4">
            <Dialog.Title className="text-lg font-bold">Edit Task</Dialog.Title>

            <input
              type="date"
              name="taskDate"
              value={editForm.taskDate}
              onChange={handleEditChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="taskTitle"
              value={editForm.taskTitle}
              onChange={handleEditChange}
              className="w-full border p-2 rounded"
              placeholder="Task Title"
            />
            <textarea
              name="logMessage"
              value={editForm.logMessage}
              onChange={handleEditChange}
              className="w-full border p-2 rounded"
              rows={3}
              placeholder="Log Message"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default TaskLogsPage;
