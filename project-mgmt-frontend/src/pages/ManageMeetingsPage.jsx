import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Eye, Pencil, Plus, Filter } from "lucide-react";
import { 
  getAllJobRoles,
  getEmployeesByRole,
  createMeeting,
  getAllMeetings,
  getMyMeetings,
  getAssignedMeetings
} from "../services/employeeApi";

const ManageMeetingsPage = ({ currentUser }) => {
  // State for meetings data
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({ 
    meetingType: "online", 
    participants: [], 
    meetingDate: "", 
    meetingTime: "", 
    venue: "", 
    meetingDescription: "" 
  });
  
  // State for employee data
  const [roles, setRoles] = useState([]);
  const [employeesByRole, setEmployeesByRole] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'created', 'assigned'
  const [viewMeeting, setViewMeeting] = useState(null);

  // Toggle user selection
  const toggleUser = (empId, name, role) => {
    const exists = selectedUsers.some(u => u.empId === empId);
    if (exists) {
      setSelectedUsers(selectedUsers.filter(u => u.empId !== empId));
    } else {
      setSelectedUsers([...selectedUsers, { empId, name, role }]);
    }
  };

  // Fetch meetings based on filter
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        let response;
        if (filter === "created") {
          response = await getMyMeetings(currentUser.empId);
        } else if (filter === "assigned") {
          response = await getAssignedMeetings(currentUser.empId);
        } else {
          response = await getAllMeetings();
        }
        setMeetings(response.data);
      } catch (error) {
        console.error("Error loading meetings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMeetings();
  }, [filter, currentUser, showCreateModal]);

  // Fetch roles and employees
  useEffect(() => {
    const fetchRolesAndEmployees = async () => {
      try {
        const rolesResponse = await getAllJobRoles();
        setRoles(rolesResponse.data);
        
        if (rolesResponse.data.length > 0) {
          setSelectedRole(rolesResponse.data[0]);
          
          const employeesMap = {};
          for (const role of rolesResponse.data) {
            const employeesResponse = await getEmployeesByRole(role);
            employeesMap[role] = employeesResponse.data;
          }
          setEmployeesByRole(employeesMap);
        }
      } catch (error) {
        console.error("Error loading roles/employees:", error);
      }
    };
    
    fetchRolesAndEmployees();
  }, []);

  const handleCreate = async () => {
    if (!form.meetingDescription || !form.meetingDate || !form.meetingTime || selectedUsers.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const meetingData = {
        meetingType: form.meetingType,
        participants: selectedUsers.map(u => u.empId),
        meetingDate: form.meetingDate,
        meetingTime: form.meetingTime,
        venue: form.meetingType === "physical" ? form.venue : "Online",
        meetingDescription: form.meetingDescription,
        createdBy: currentUser.empId
      };

      await createMeeting(meetingData);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("Failed to create meeting. Please try again.");
    }
  };

  const resetForm = () => {
    setForm({ 
      meetingType: "online", 
      participants: [], 
      meetingDate: "", 
      meetingTime: "", 
      venue: "", 
      meetingDescription: "" 
    });
    setSelectedUsers([]);
  };

  if (loading) {
    return <div className="p-6">Loading data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Meetings</h2>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Meetings</option>
            <option value="created">My Created Meetings</option>
            <option value="assigned">Assigned To Me</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Create Meeting
          </button>
        </div>
      </div>

      {/* Meetings Table */}
      <div className="bg-white p-4 rounded shadow">
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Venue</th>
                <th className="p-2 border">Participants</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.length > 0 ? (
                meetings.map((m) => (
                  <tr key={m.meetingId}>
                    <td className="p-2 border">{m.meetingDescription}</td>
                    <td className="p-2 border">{m.meetingType === "online" ? "Online" : "Physical"}</td>
                    <td className="p-2 border">{new Date(m.meetingDate).toLocaleDateString()}</td>
                    <td className="p-2 border">{m.meetingTime}</td>
                    <td className="p-2 border">{m.venue}</td>
                    <td className="p-2 border">
                      {m.participants ? m.participants.length : 0} participants
                    </td>
                    <td className="p-2 border flex gap-3 justify-center">
                      <button onClick={() => setViewMeeting(m)} title="View">
                        <Eye size={18} className="text-green-600 hover:text-green-800" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 p-4">
                    No meetings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Meeting Modal */}
      <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded p-6 space-y-4">
            <Dialog.Title className="text-xl font-bold">Create New Meeting</Dialog.Title>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Meeting Type</label>
                <select
                  value={form.meetingType}
                  onChange={(e) => setForm({...form, meetingType: e.target.value})}
                  className="w-full border p-2 rounded"
                >
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>
              </div>

              {form.meetingType === "physical" && (
                <div>
                  <label className="block font-medium mb-1">Venue</label>
                  <input
                    type="text"
                    placeholder="Meeting Venue"
                    value={form.venue}
                    onChange={(e) => setForm({...form, venue: e.target.value})}
                    className="w-full border p-2 rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Meeting Description*</label>
              <input
                type="text"
                placeholder="Meeting Description"
                value={form.meetingDescription}
                onChange={(e) => setForm({...form, meetingDescription: e.target.value})}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Date*</label>
                <input
                  type="date"
                  value={form.meetingDate}
                  onChange={(e) => setForm({...form, meetingDate: e.target.value})}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Time*</label>
                <input
                  type="time"
                  value={form.meetingTime}
                  onChange={(e) => setForm({...form, meetingTime: e.target.value})}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Select Role</label>
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
            </div>

            <div>
              <label className="block font-medium mb-1">Select Participants*</label>
              <div className="border p-2 rounded h-32 overflow-y-auto">
                {employeesByRole[selectedRole]?.map((employee) => (
                  <label key={employee.empId} className="flex items-center p-1 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedUsers.some(u => u.empId === employee.empId)}
                      onChange={() => toggleUser(employee.empId, employee.name, selectedRole)}
                      className="mr-2"
                    />
                    <span>{employee.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedUsers.length > 0 && (
              <div className="mt-4">
                <label className="block font-medium mb-2">Selected Participants:</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedUsers.map((user, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {user.name}
                      <button 
                        onClick={() => toggleUser(user.empId, user.name, user.role)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Create Meeting
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Meeting Modal */}
      {viewMeeting && (
        <Dialog open={!!viewMeeting} onClose={() => setViewMeeting(null)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl bg-white rounded p-6 space-y-4">
              <Dialog.Title className="text-xl font-bold">Meeting Details</Dialog.Title>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Description:</span> {viewMeeting.meetingDescription}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {viewMeeting.meetingType === "online" ? "Online" : "Physical"}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {new Date(viewMeeting.meetingDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {viewMeeting.meetingTime}
                </div>
                <div>
                  <span className="font-medium">Venue:</span> {viewMeeting.venue}
                </div>
                <div>
                  <span className="font-medium">Participants:</span> {viewMeeting.participants ? viewMeeting.participants.length : 0}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setViewMeeting(null)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ManageMeetingsPage;