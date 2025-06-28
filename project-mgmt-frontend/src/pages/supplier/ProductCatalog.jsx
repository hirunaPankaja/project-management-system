// src/pages/SupplierProductCatalog.jsx

import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Plus } from "lucide-react";
import { addProducts, viewProducts } from "../../services/supplierApi";
import { toast } from "react-toastify";

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
        if (result) {
          const base64 = result.includes(",")
            ? result.split(",")[1]
            : result;
          setNewProduct((prev) => ({
            ...prev,
            productImage: base64,
          }));
        }
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

  const handleEdit = (product) => {
    // Implement edit logic here
    console.log("Edit product:", product);
    toast.info("Edit logic not yet implemented.");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Supplier Product Catalog</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} onEdit={handleEdit} />
        ))}
      </div>

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
    </div>
  );
}
