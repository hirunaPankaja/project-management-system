import React, { useState } from 'react';

function SearchEmployee() {
  const [searchType, setSearchType] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Mock employee data - replace with API calls
  const mockEmployees = [
    {
      id: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      address: '123 Main St, Colombo',
      phone: '+94123456789',
      nic: '123456789V',
      joinDate: '2020-01-15'
    },
    // Add more mock employees as needed
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    const foundEmployee = mockEmployees.find(emp => 
      searchType === 'id' 
        ? emp.id.toLowerCase() === searchQuery.toLowerCase()
        : emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEmployee(foundEmployee);
    if (foundEmployee) {
      setEditData({ ...foundEmployee });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save changes
    console.log('Saving:', editData);
    setEmployee(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(employee);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Search Employee</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={searchType === 'name'}
                onChange={() => setSearchType('name')}
                className="mr-2"
              />
              By Name
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={searchType === 'id'}
                onChange={() => setSearchType('id')}
                className="mr-2"
              />
              By ID
            </label>
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchType === 'name' ? 'Enter employee name' : 'Enter employee ID'}
            className="flex-1 rounded-md border-gray-300 shadow-sm"
            required
          />
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {employee ? (
        <div className="bg-white p-6 rounded-lg shadow">
          {isEditing ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={editData.position}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={editData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium">NIC</label>
                  <input
                    type="text"
                    name="nic"
                    value={editData.nic}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={employee.profilePic} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{employee.name}</h2>
                    <p className="text-blue-600">{employee.position}</p>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p>{employee.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{employee.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{employee.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">NIC</p>
                    <p>{employee.nic}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{employee.address}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p>{employee.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : searchQuery && (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p>No employee found with {searchType === 'name' ? 'that name' : 'that ID'}</p>
        </div>
      )}
    </div>
  );
}

export default SearchEmployee;