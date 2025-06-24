import React, { useState } from 'react';
import { Eye, Download, X } from 'lucide-react';

function Designs() {
  const [designs, setDesigns] = useState([
    {
      id: 1,
      outletName: 'Sunshine Bakery',
      designType: 'bakery',
      designFile: 'bakery-floorplan.pdf',
      currentUser: 'John Doe',
      previewImage: 'https://example.com/bakery-design.jpg'
    },
    {
      id: 2,
      outletName: 'Urban Supermarket',
      designType: 'supermarket',
      designFile: 'supermarket-layout.ai',
      currentUser: 'Jane Smith',
      previewImage: 'https://example.com/supermarket-design.jpg'
    },
    {
      id: 3,
      outletName: 'Luxury Bar',
      designType: 'bar',
      designFile: 'bar-blueprint.dwg',
      currentUser: 'Mike Johnson',
      previewImage: 'https://example.com/bar-design.jpg'
    },
  ]);

  const [selectedDesign, setSelectedDesign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleDownload = (file) => {
    console.log(`Downloading ${file}`);
    // Actual download implementation would go here
  };

  const getDesignTypeBadge = (type) => {
    const colors = {
      bakery: 'bg-amber-100 text-amber-800',
      supermarket: 'bg-blue-100 text-blue-800',
      bar: 'bg-purple-100 text-purple-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type]}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Designs</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outlet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {designs.map((design) => (
                <tr key={design.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{design.outletName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getDesignTypeBadge(design.designType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{design.designFile}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{design.currentUser}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(design)}
                        className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded"
                        title="View design"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDownload(design.designFile)}
                        className="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Design Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-medium">
                {selectedDesign?.outletName} - {selectedDesign?.designType}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <img 
                src={selectedDesign?.previewImage} 
                alt="Design Preview" 
                className="w-full h-auto border rounded"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Design+Preview+Not+Available';
                }}
              />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Current user: {selectedDesign?.currentUser}
                </span>
                <button
                  onClick={() => handleDownload(selectedDesign?.designFile)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Design File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Designs;