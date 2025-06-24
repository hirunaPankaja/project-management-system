import { useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function SupplierProductCatalog() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Cement 50kg",
      image: "https://via.placeholder.com/150",
      price: 1200,
      unit: "bag",
      discount: { percentage: 10, description: "New Year Deal" },
    },
    {
      id: 2,
      name: "Bricks (100 units)",
      image: "https://via.placeholder.com/150",
      price: 8000,
      unit: "bundle",
      discount: null,
    },
    {
      id: 3,
      name: "Paint 4L",
      image: "https://via.placeholder.com/150",
      price: 3200,
      unit: "can",
      discount: { percentage: 5, description: "Bulk Offer" },
    },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        [name]: name === "percentage" ? Number(value) : value,
      },
    }));
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? {
              ...editingProduct,
              discount:
                editingProduct.discount &&
                editingProduct.discount.percentage
                  ? editingProduct.discount
                  : null,
            }
          : p
      )
    );
    setEditingProduct(null);
  };

  const handleCancel = () => setEditingProduct(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Product Catalog</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onEdit={handleEdit} />
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleEditChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Unit</label>
              <input
                type="text"
                name="unit"
                value={editingProduct.unit}
                onChange={handleEditChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Discount Percentage</label>
              <input
                type="number"
                name="percentage"
                value={editingProduct.discount?.percentage || ""}
                onChange={handleDiscountChange}
                className="w-full border rounded px-2 py-1"
                min="0"
                max="100"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Discount Description</label>
              <input
                type="text"
                name="description"
                value={editingProduct.discount?.description || ""}
                onChange={handleDiscountChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
