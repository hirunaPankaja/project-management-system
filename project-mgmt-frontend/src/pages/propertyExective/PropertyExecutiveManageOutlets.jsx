import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const PropertyExecutiveManageOutlets = () => {
  const [outlets, setOutlets] = useState([
    {
      id: 1,
      name: 'Golden Arcade',
      manager_name: 'Dilani Gunasekara',
      manager_number: '0771234567',
      manager_email: 'dilani@golden.lk',
      opening_date: '2023-01-15',
      profit_status: 'Profit',
      monthly_profit: 350000
    },
    {
      id: 2,
      name: 'Royal Trade Hub',
      manager_name: 'Chamath Silva',
      manager_number: '0719876543',
      manager_email: 'chamath@royal.lk',
      opening_date: '2024-03-10',
      profit_status: 'Loss',
      monthly_profit: -120000
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    manager_name: '',
    manager_number: '',
    manager_email: '',
    opening_date: '',
    profit_status: '',
    monthly_profit: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setFormData({
      name: '',
      manager_name: '',
      manager_number: '',
      manager_email: '',
      opening_date: '',
      profit_status: '',
      monthly_profit: ''
    });
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditForm = outlet => {
    setFormData(outlet);
    setEditingId(outlet.id);
    setModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      setOutlets(prev =>
        prev.map(o => o.id === editingId ? { ...formData, id: editingId } : o)
      );
    } else {
      const newOutlet = { ...formData, id: Date.now() };
      setOutlets(prev => [...prev, newOutlet]);
    }
    setModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Manage Outlets</h2>

      <button
        onClick={openAddForm}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        + Add Outlet
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outlets.map(outlet => (
          <div
            key={outlet.id}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 space-y-1 relative"
          >
            <button
              onClick={() => openEditForm(outlet)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <h3 className="text-lg font-semibold text-gray-800">{outlet.name}</h3>
            <p className="text-sm text-gray-600"><strong>Manager:</strong> {outlet.manager_name}</p>
            <p className="text-sm text-gray-600"><strong>Contact:</strong> {outlet.manager_number}</p>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {outlet.manager_email}</p>
            <p className="text-sm text-gray-600"><strong>Opening Date:</strong> {outlet.opening_date}</p>
            <p className="text-sm text-gray-600"><strong>Profit Status:</strong> {outlet.profit_status}</p>
            <p className="text-sm text-gray-600"><strong>Monthly Profit:</strong> Rs. {parseInt(outlet.monthly_profit).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600">
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              {editingId ? 'Update Outlet' : 'Add Outlet'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <input name="name" placeholder="Outlet Name" value={formData.name} onChange={handleInputChange} required className="input" />
              <input name="manager_name" placeholder="Manager Name" value={formData.manager_name} onChange={handleInputChange} required className="input" />
              <input name="manager_number" placeholder="Manager Phone" type="tel" value={formData.manager_number} onChange={handleInputChange} required className="input" />
              <input name="manager_email" placeholder="Manager Email" type="email" value={formData.manager_email} onChange={handleInputChange} required className="input" />
              <input name="opening_date" placeholder="Opening Date" type="date" value={formData.opening_date} onChange={handleInputChange} required className="input" />
              <select name="profit_status" value={formData.profit_status} onChange={handleInputChange} required className="input">
                <option value="">Select Profit Status</option>
                <option value="Profit">Profit</option>
                <option value="Loss">Loss</option>
                <option value="Break-even">Break-even</option>
              </select>
              <input name="monthly_profit" type="number" placeholder="Monthly Profit (Rs.)" value={formData.monthly_profit} onChange={handleInputChange} required className="input md:col-span-2" />
              <div className="md:col-span-2">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
                  {editingId ? 'Update Outlet' : 'Save Outlet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyExecutiveManageOutlets;
