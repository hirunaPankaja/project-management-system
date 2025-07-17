import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Eye, Pencil } from "lucide-react";
import { 
  getAllJobRoles,
  getEmployeesByRole
} from "../services/employeeApi";

const ManageMeetingsPage = () => {
  // State for meetings data
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", time: "" });
  
  // State for employee data
  const [roles, setRoles] = useState([]);
  const [employeesByRole, setEmployeesByRole] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for modals
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", date: "", time: "", users: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [viewMeeting, setViewMeeting] = useState(null);

  // Fetch all job roles and employees when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get all job roles
        const rolesResponse = await getAllJobRoles();
        setRoles(rolesResponse.data);
        
        if (rolesResponse.data.length > 0) {
          setSelectedRole(rolesResponse.data[0]); // Set first role as default
          
          // 2. Get employees for each role
          const employeesMap = {};
          for (const role of rolesResponse.data) {
            const employeesResponse = await getEmployeesByRole(role);
            employeesMap[role] = employeesResponse.data;
          }
          setEmployeesByRole(employeesMap);
        }
      } catch (error) {
        console.error("Error loading employee data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const toggleUser = (email, role, list, setter) => {
    const exists = list.some((u) => u.email === email);
    if (exists) {
      setter(list.filter((u) => u.email !== email));
    } else {
      setter([...list, { email, role }]);
    }
  };

  const handleCreate = () => {
    if (!form.title || !form.date || !form.time || selectedUsers.length === 0) return;
    setMeetings([...meetings, { ...form, users: selectedUsers }]);
    setForm({ title: "", date: "", time: "" });
    setSelectedUsers([]);
  };

  const openEditModal = (i) => {
    const m = meetings[i];
    setEditForm({ ...m });
    setEditingIndex(i);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const updated = [...meetings];
    updated[editingIndex] = editForm;
    setMeetings(updated);
    setIsEditing(false);
  };

  if (loading) {
    return <div className="p-6">Loading employee data...</div>;
  }

  if (roles.length === 0) {
    return <div className="p-6">No job roles found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Manage Meetings</h2>

      {/* Create Meeting Form */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <input
          type="text"
          placeholder="Meeting Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="w-full border p-2 rounded"
        />

        {/* Role Selection Dropdown */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.replace("_", " ")}
            </option>
          ))}
        </select>

        {/* Employee Selection List */}
        <div className="border p-2 rounded h-32 overflow-y-auto">
          {employeesByRole[selectedRole]?.map((employee) => (
            <label key={employee.email} className="block">
              <input
                type="checkbox"
                checked={selectedUsers.some((u) => u.email === employee.email)}
                onChange={() => toggleUser(employee.email, selectedRole, selectedUsers, setSelectedUsers)}
              />
              <span className="ml-2">
                {employee.name} 
                <span className="text-xs text-gray-500 ml-2">({employee.email})</span>
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create Meeting
        </button>
      </div>

      {/* Meetings Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Scheduled Meetings</h3>
        <table className="w-full border text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Participants</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.length > 0 ? (
              meetings.map((m, i) => (
                <tr key={i}>
                  <td className="p-2 border">{m.title}</td>
                  <td className="p-2 border">{m.date}</td>
                  <td className="p-2 border">{m.time}</td>
                  <td className="p-2 border">
                    {m.users.map(u => u.email).join(", ")}
                  </td>
                  <td className="p-2 border flex gap-3 justify-center">
                    <button onClick={() => openEditModal(i)} title="Edit">
                      <Pencil size={18} className="text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={() => setViewMeeting(m)} title="View">
                      <Eye size={18} className="text-green-600 hover:text-green-800" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 p-4">
                  No meetings scheduled
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded max-w-md w-full space-y-4">
            <Dialog.Title className="text-lg font-semibold">Edit Meeting</Dialog.Title>

            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Meeting Title"
            />
            <input
              type="date"
              value={editForm.date}
              onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="time"
              value={editForm.time}
              onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <div className="border p-2 rounded h-32 overflow-y-auto">
              {Object.entries(employeesByRole).flatMap(([role, employees]) =>
                employees.map((employee) => (
                  <label key={employee.email} className="block">
                    <input
                      type="checkbox"
                      checked={editForm.users.some((u) => u.email === employee.email)}
                      onChange={() => {
                        const exists = editForm.users.find((u) => u.email === employee.email);
                        setEditForm((prev) => ({
                          ...prev,
                          users: exists
                            ? prev.users.filter((u) => u.email !== employee.email)
                            : [...prev.users, { email: employee.email, role }]
                        }));
                      }}
                    />{" "}
                    {employee.name} <span className="text-sm text-gray-500">({role})</span>
                  </label>
                ))
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:underline">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Modal */}
      <Dialog open={!!viewMeeting} onClose={() => setViewMeeting(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded max-w-md w-full space-y-4">
            <Dialog.Title className="text-lg font-semibold">Meeting Details</Dialog.Title>

            {viewMeeting && (
              <>
                <div>
                  <strong>Title:</strong> {viewMeeting.title}
                </div>
                <div>
                  <strong>Date:</strong> {viewMeeting.date}
                </div>
                <div>
                  <strong>Time:</strong> {viewMeeting.time}
                </div>
                <div>
                  <strong>Participants:</strong>
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    {viewMeeting.users.map((user, idx) => {
                      const employee = Object.values(employeesByRole)
                        .flat()
                        .find(e => e.email === user.email);
                      return (
                        <li key={idx}>
                          {employee?.name || user.email}{" "}
                          <span className="text-sm text-gray-500">({user.role})</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setViewMeeting(null)}
                    className="text-blue-600 hover:underline"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageMeetingsPage;