import { Bell, MessageCircle } from "lucide-react";
import keellsLogo from '../assets/keells_logo.png';

export default function TopHeader({ user }) {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Left section: Logo + App Name */}
      <div className="flex items-center gap-2">
        <img
          src={keellsLogo}
          alt="Keells logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-bold text-emerald-600">ProjectHub</span>
      </div>

      {/* Right section: Notifications & User Info */}
      <div className="flex items-center gap-4">
        {/* Bell Icon with notification dot */}
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Message Icon */}
        <MessageCircle className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />

        {/* User Info */}
        <div className="flex items-center space-x-2">
          <img
            src={user?.profileImage || "/default-profile.png"}
            alt="User"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="text-sm text-right">
            <div className="font-medium">{user?.name}</div>
            <div className="text-gray-500 text-xs">
              {user?.role} • ID: {user?.empId}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
