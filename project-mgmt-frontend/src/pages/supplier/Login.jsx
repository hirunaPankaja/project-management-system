// src/pages/SupplierProductCatalog.jsx

import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Plus } from "lucide-react";
import {
  addProducts,
  viewProducts,
  updateProduct,
  deleteProduct,
} from "../../services/supplierApi";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function SupplierProductCatalog() {
  const [supplierId, setSupplierId] = useState(null);
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    sellingUnit: "",
    category: "",
    productImage: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("supplierId");
    if (storedId) {
      setSupplierId(Number(storedId));
      fetchProducts(Number(storedId));
    }
  }, []);

  const fetchProducts = async (id) => {
    try {
      const res = await viewProducts(id);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products.");
    }
  };

  // Add New Product input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        setNewProduct((prev) => ({
          ...prev,
          productImage: base64,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.productName.trim()) {
      toast.error("Product name is required.");
      return;
    }

    try {
      await addProducts({
        supplierId,
        products: [newProduct],
      });
      toast.success("Product added successfully!");
      setNewProduct({
        productName: "",
        productDescription: "",
        productPrice: 0,
        sellingUnit: "",
        category: "",
        productImage: "",
      });
      fetchProducts(supplierId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product.");
    }
  };

  // Edit modal handlers
  const handleEdit = (product) => {
    // Copy product; optionally clear productImage to force new upload
    setEditingProduct({ ...product, productImage: "" });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? Number(value) : value,
    }));
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        setEditingProduct((prev) => ({
          ...prev,
          productImage: base64,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(editingProduct);
      toast.success("Product updated successfully!");
      setIsEditModalOpen(false);
      fetchProducts(supplierId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    }
  };

  // Delete product handler
  const handleDelete = async (product) => {
    if (
      window.confirm(`Are you sure you want to delete "${product.productName}"?`)
    ) {
      try {
        await deleteProduct(product.productId);
        toast.success("Product deleted successfully!");
        fetchProducts(supplierId);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete product.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Supplier Product Catalog
      </h2>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add New Product */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Product</h3>
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          name="productName"
          value={newProduct.productName}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="text"
          placeholder="Description"
          name="productDescription"
          value={newProduct.productDescription}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="number"
          placeholder="Price"
          name="productPrice"
          value={newProduct.productPrice}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="text"
          placeholder="Unit"
          name="sellingUnit"
          value={newProduct.sellingUnit}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border px-3 py-2 rounded w-full md:w-1/5"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </button>
      </div>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Product"
        className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
      >
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        {editingProduct && (
          <div className="space-y-3">
            <input
              type="text"
              name="productName"
              placeholder="Name"
              value={editingProduct.productName}
              onChange={handleEditInputChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="productDescription"
              placeholder="Description"
              value={editingProduct.productDescription}
              onChange={handleEditInputChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="number"
              name="productPrice"
              placeholder="Price"
              value={editingProduct.productPrice}
              onChange={handleEditInputChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="sellingUnit"
              placeholder="Unit"
              value={editingProduct.sellingUnit}
              onChange={handleEditInputChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editingProduct.category}
              onChange={handleEditInputChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageUpload}
              className="border px-3 py-2 rounded w-full"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
