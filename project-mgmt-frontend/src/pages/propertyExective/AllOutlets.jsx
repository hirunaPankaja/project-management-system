// src/pages/AllOutlets.jsx
import { useEffect, useState } from "react";
import { getAllOutlets, getOutletById } from "../../services/employeeApi";

export default function AllOutlets() {
  const [outlets, setOutlets] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAllOutlets().then((res) => setOutlets(res.data));
  }, []);

  const fetchDetail = (id) => {
    getOutletById(id).then((res) => setSelected(res.data));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Outlets</h1>
      <ul className="space-y-2">
        {outlets.map((o) => (
          <li
            key={o.outletId}
            className="border p-4 rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => fetchDetail(o.outletId)}
          >
            {o.outletName}
          </li>
        ))}
      </ul>

      {selected && (
        <div className="mt-6 border p-4 rounded">
          <h2 className="text-xl font-bold">{selected.outletName}</h2>
          <p>Status: {selected.profitStatus}</p>
          <p>Manager: {selected.outletManagerName}</p>
          <p>Email: {selected.omEmail}</p>
          <p>Contact: {selected.onContactNumber}</p>
        </div>
      )}
    </div>
  );
}
