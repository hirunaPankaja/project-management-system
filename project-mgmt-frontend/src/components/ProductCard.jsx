import { Pencil, Percent } from "lucide-react";

export default function ProductCard({ product, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4 relative">
      {product.discount && (
        <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
          {product.discount.percentage}% OFF
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-1">Price: Rs. {product.price.toFixed(2)}</p>
      <p className="text-gray-600 text-sm mb-2">Unit: {product.unit}</p>

      {product.discount && (
        <div className="text-sm text-green-600 mb-2 italic">
          {product.discount.description}
        </div>
      )}

      <div className="flex space-x-3 mt-4">
        <button
          onClick={() => onEdit(product.id)}
          className="flex items-center px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </button>
        <button
          onClick={() => alert("Add discount logic here")}
          className="flex items-center px-3 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <Percent className="w-4 h-4 mr-1" /> Discount
        </button>
      </div>
    </div>
  );
}
