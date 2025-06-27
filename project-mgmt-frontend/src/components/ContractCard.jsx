import { CheckCircle, XCircle } from "lucide-react";

export default function ContractCard({ contract, onClick }) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
      onClick={() => onClick(contract)}
    >
      <h3 className="text-lg font-bold mb-2">{contract.name}</h3>
      <p className="text-sm text-gray-600">Type: {contract.type}</p>
      <p className="text-sm text-gray-600">Date: {contract.date}</p>
      <p className="text-sm text-gray-600">
        Budget: Rs. {contract.budget.toLocaleString()}
      </p>
      <div className="flex items-center gap-2 mt-2">
        {contract.status === "approved" && (
          <span className="flex items-center text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Approved
          </span>
        )}
        {contract.status === "declined" && (
          <span className="flex items-center text-red-600 text-sm">
            <XCircle className="w-4 h-4 mr-1" />
            Declined
          </span>
        )}
        {contract.status === "pending" && (
          <span className="text-yellow-600 text-sm">Pending</span>
        )}
      </div>
      {contract.status === "declined" && (
        <p className="text-xs text-red-500 mt-1 italic">
          Reason: {contract.reason}
        </p>
      )}
    </div>
  );
}
