// src/components/ProductCard.jsx

import { Pencil } from "lucide-react";

export default function ProductCard({ product, onEdit }) {
  const imageUrl = product.productImage
    ? `data:image/png;base64,${product.productImage}`
    : "https://via.placeholder.com/150";

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4 relative">
      <img
        src={imageUrl}
        alt={product.productName}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
      <p className="text-gray-600 text-sm mb-1">
        Price: Rs. {Number(product.productPrice).toFixed(2)}
      </p>
      <p className="text-gray-600 text-sm mb-1">
        Unit: {product.sellingUnit}
      </p>
      <p className="text-gray-600 text-sm mb-2">
        Category: {product.category}
      </p>
      <div className="flex space-x-3 mt-4">
        <button
          onClick={() => onEdit(product)}
          className="flex items-center px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </button>
      </div>
    </div>
  );
}
