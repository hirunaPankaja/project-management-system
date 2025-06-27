import { useState } from "react";
import ContractCard from "../../components/ContractCard";

export default function Contracts() {
  const [selectedContract, setSelectedContract] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Dummy data for demonstration
  const contracts = [
    {
      id: 1,
      name: "Supply Cement",
      type: "Supply",
      status: "pending",
      date: "2025-07-10",
      budget: 500000,
      reason: "",
      products: [
        { name: "Cement 50kg", quantity: 100, price: 1200 },
        { name: "Bricks (100 units)", quantity: 50, price: 8000 },
      ],
    },
    {
      id: 2,
      name: "Electrical Installation",
      type: "Construction",
      status: "declined",
      date: "2025-06-15",
      budget: 1200000,
      reason: "Pricing too high compared to competitors",
      products: [
        { name: "Wiring bundle", quantity: 20, price: 15000 },
        { name: "Light fixtures", quantity: 40, price: 2000 },
      ],
    },
  ];

  const handleStatusUpdate = (newStatus) => {
    alert(`Contract updated to: ${newStatus}`);
    // Here you’d make an API call to update the backend
  };

  const handlePayment = () => {
    const totalWithoutDiscount = selectedContract.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discountedTotal =
      totalWithoutDiscount * ((100 - discount) / 100);

    alert(`
      Payment Successful!
      Original Total: Rs. ${totalWithoutDiscount.toLocaleString()}
      Discount Applied: ${discount}%
      Final Total: Rs. ${discountedTotal.toLocaleString()}
      (An invoice would be generated here.)
    `);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Contracts
      </h2>

      {/* Contracts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contracts.map((contract) => (
          <ContractCard
            key={contract.id}
            contract={contract}
            onClick={setSelectedContract}
          />
        ))}
      </div>

      {/* Contract Details */}
      {selectedContract && (
        <div className="mt-8 bg-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-bold mb-4">
            Contract: {selectedContract.name}
          </h3>

          <p className="text-gray-600 mb-2">
            Type: {selectedContract.type}
          </p>
          <p className="text-gray-600 mb-2">
            Date: {selectedContract.date}
          </p>
          <p className="text-gray-600 mb-4">
            Budget: Rs. {selectedContract.budget.toLocaleString()}
          </p>

          <h4 className="text-lg font-semibold mb-2">
            Products in Contract
          </h4>
          <ul className="mb-4">
            {selectedContract.products.map((prod, i) => (
              <li key={i} className="text-gray-700 text-sm mb-1">
                {prod.name} — Qty: {prod.quantity} — Price: Rs.{" "}
                {prod.price.toLocaleString()}
              </li>
            ))}
          </ul>

          <div className="flex space-x-3 mb-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => handleStatusUpdate("approved")}
            >
              OK, I’ll Provide
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleStatusUpdate("declined")}
            >
              Decline
            </button>
          </div>

          {/* Payment section */}
          <div className="mt-6">
            <h4 className="text-md font-bold mb-2">Make Payment</h4>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Discount (%)"
                className="border px-2 py-1 rounded w-32"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
