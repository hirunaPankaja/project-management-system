import { useEffect, useState } from "react";
import {
  filterProposalsByProposer,
  proposeLocation,
} from "../../services/employeeApi";

export default function MyProposals() {
  const [proposals, setProposals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    proposalName: "",
    proposalDescription: "",
    proposalStatus: "pending",
    propertyOwnerName: "",
    propertyOwnerContactNo: "",
    rentFee: "",
    longitude: "",
    latitude: "",
    province: "",
    district: "",
  });

  const empId = localStorage.getItem("empId");

  const loadProposals = () => {
    filterProposalsByProposer(empId).then((res) => {
      setProposals(res.data);
    });
  };

  useEffect(() => {
    loadProposals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const location = {
      longitude: parseFloat(formData.longitude),
      latitude: parseFloat(formData.latitude),
      province: formData.province,
      district: formData.district,
      legalStatus: "Owned", // or any default value
    };

    const proposal = {
      proposalName: formData.proposalName,
      proposalDescription: formData.proposalDescription,
      proposalStatus: formData.proposalStatus,
      proposalDate: new Date(), // current date
      propsalStatusDate: new Date(), // optional
      propertyOwnerName: formData.propertyOwnerName,
      propertyOwnerContactNo: formData.propertyOwnerContactNo,
      rentFee: parseFloat(formData.rentFee),
      proposalFeedback: "",
      area: formData.district, // assuming area = district
    };

    proposeLocation(empId, proposal, location).then(() => {
      setShowModal(false);
      setFormData({
        proposalName: "",
        proposalDescription: "",
        proposalStatus: "pending",
        propertyOwnerName: "",
        propertyOwnerContactNo: "",
        rentFee: "",
        longitude: "",
        latitude: "",
        province: "",
        district: "",
      });
      loadProposals();
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Proposals</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Proposal
        </button>
      </div>

      <ul className="space-y-2">
        {proposals.map((p) => (
          <li
            key={p.proposalId}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="font-semibold">{p.proposalName}</h2>
            <p className="text-gray-600">{p.proposalDescription}</p>
            <p
              className={`mt-2 font-medium ${
                p.proposalFeedback
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {p.proposalFeedback || "No feedback yet"}
            </p>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">New Proposal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="proposalName"
                placeholder="Proposal Name"
                value={formData.proposalName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <textarea
                name="proposalDescription"
                placeholder="Proposal Description"
                value={formData.proposalDescription}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <input
                type="text"
                name="propertyOwnerName"
                placeholder="Property Owner Name"
                value={formData.propertyOwnerName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <input
                type="text"
                name="propertyOwnerContactNo"
                placeholder="Owner Contact No"
                value={formData.propertyOwnerContactNo}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <input
                type="number"
                step="0.01"
                name="rentFee"
                placeholder="Rent Fee"
                value={formData.rentFee}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.0001"
                  name="latitude"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="number"
                  step="0.0001"
                  name="longitude"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <input
                type="text"
                name="province"
                placeholder="Province"
                value={formData.province}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
