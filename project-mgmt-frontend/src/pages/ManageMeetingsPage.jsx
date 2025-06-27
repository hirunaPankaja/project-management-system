import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Eye, Pencil} from "lucide-react"; // 👁️ ✏️ 👍

const userDirectory = {
  Designer: ["alice@firm.com", "mark@firm.com"],
  Architect: ["sara@firm.com", "john@firm.com"],
  Engineer: ["emma@firm.com", "nate@firm.com"]
};

const ManageMeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", time: "" });
  const [selectedRole, setSelectedRole] = useState("Designer");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", date: "", time: "", users: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [viewMeeting, setViewMeeting] = useState(null);

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

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Manage Meetings</h2>

      {/* ➕ Create Meeting Form */}
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

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {Object.keys(userDirectory).map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>

        <div className="border p-2 rounded h-32 overflow-y-auto">
          {userDirectory[selectedRole]?.map((email) => (
            <label key={email} className="block">
              <input
                type="checkbox"
                checked={selectedUsers.some((u) => u.email === email)}
                onChange={() =>
                  toggleUser(email, selectedRole, selectedUsers, setSelectedUsers)
                }
              />{" "}
              {email}
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

      {/* 📋 Meetings Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Scheduled Meetings</h3>
        <table className="w-full border text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Users</th>
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
                  <td className="p-2 border">{m.users.map((u) => u.email).join(", ")}</td>
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

      {/* ✏️ Edit Modal */}
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
              {Object.entries(userDirectory).flatMap(([role, emails]) =>
                emails.map((email) => (
                  <label key={email} className="block">
                    <input
                      type="checkbox"
                      checked={editForm.users.some((u) => u.email === email)}
                      onChange={() => {
                        const exists = editForm.users.find((u) => u.email === email);
                        setEditForm((prev) => ({
                          ...prev,
                          users: exists
                            ? prev.users.filter((u) => u.email !== email)
                            : [...prev.users, { email, role }]
                        }));
                      }}
                    />{" "}
                    {email} <span className="text-sm text-gray-500">({role})</span>
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

       {/* 👁️ View Modal */}
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
                    {viewMeeting.users.map((user, idx) => (
                      <li key={idx}>
                        {user.email}{" "}
                        <span className="text-sm text-gray-500">({user.role})</span>
                      </li>
                    ))}
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
