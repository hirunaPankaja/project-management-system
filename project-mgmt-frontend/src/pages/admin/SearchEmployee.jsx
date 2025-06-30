import React, { useEffect, useState } from "react";
import {
  searchEmployee,
  getEmployeeById,
  deleteEmployeeById
} from "../../services/employeeApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Edit,Delete}from "lucide-react";

function SearchEmployee() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await searchEmployee();
      setEmployees(res.data);
      setFilteredEmployees(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch employees.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const lower = e.target.value.toLowerCase();

    const filtered = employees.filter(emp =>
      emp.firstName.toLowerCase().includes(lower) ||
      emp.lastName.toLowerCase().includes(lower) ||
      emp.empId.toLowerCase().includes(lower)
    );

    setFilteredEmployees(filtered);
  };

  const handleEditClick = async (empId) => {
    try {
      const res = await getEmployeeById(empId);
      setEditData(res.data);
      setIsEditing(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch employee details.");
    }
  };

  const handleDelete = async (empId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await deleteEmployeeById(empId);
      toast.success("Employee deleted.");
      setEmployees((prev) => prev.filter((e) => e.empId !== empId));
      setFilteredEmployees((prev) => prev.filter((e) => e.empId !== empId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete employee.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving:", editData);
    // You can implement PUT request here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Search Employee</h1>

      {/* Search box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name or ID..."
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Table of employees */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Employee ID</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.empId}>
                <td className="border p-2">{emp.empId}</td>
                <td className="border p-2">{emp.firstName}</td>
                <td className="border p-2">{emp.lastName}</td>
                <td className="border p-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(emp.empId)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(emp.empId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td
                  className="text-center text-gray-500 p-4"
                  colSpan={4}
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit popup */}
      {isEditing && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow max-w-xl w-full">
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editData.email || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Job Role
                </label>
                <input
                  type="text"
                  name="jobRole"
                  value={editData.jobRole || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Add other fields as needed */}
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchEmployee;
