import { FileText, CreditCard } from "lucide-react";

const stats = [
  {
    label: "Contracts",
    value: 12,
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50",
  },
  {
    label: "Payments",
    value: 8,
    icon: <CreditCard className="w-8 h-8 text-green-600" />,
    bg: "bg-green-50",
  },
];

export default function SupplierDashboard() {
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Supplier Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center p-6 rounded-lg shadow hover:shadow-md transition ${stat.bg}`}
          >
            <div className="mr-4">{stat.icon}</div>
            <div>
              <div className="text-3xl font-semibold text-gray-800">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
