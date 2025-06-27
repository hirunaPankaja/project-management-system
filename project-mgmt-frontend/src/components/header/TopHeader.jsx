import { Bell, MessageCircle } from "lucide-react";
import { useState } from "react";
import keellsLogo from "../../assets/keells_logo.png";
import defaultUserImage from "../../assets/default_user_image.png";
import NotificationOverlay from "../../components/NotificationOverlay";
import { Link } from "react-router-dom";

export default function TopHeader({ user }) {
  const [showNotifications, setShowNotifications] = useState(false);

  // 🔔 Example mock notifications
  const notifications = [
    {
      id: 1,
      message: "Design review at 2 PM",
      time: "5 mins ago",
      type: "meeting",
    },
    {
      id: 2,
      message: "New file uploaded by Engineer",
      time: "10 mins ago",
      type: "system",
    },
    {
      id: 3,
      message: "Weekly report due tomorrow",
      time: "1 hour ago",
      type: "reminder",
    },
  ];

  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 relative">

      {/* Left: Logo and App Name */}
      <Link to ="/home" className="flex items-center gap-2">
        <img
          src={keellsLogo}
          alt="Keells logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-bold text-emerald-600">ProjectHub</span>
        
      </Link>

      {/* Right: Icons and User Info */}
      <div className="flex items-center gap-7">
        {/* Bell Icon */}
        <div className="relative">
          <Bell
            className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer"
            onClick={() => setShowNotifications((prev) => !prev)}
          />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}
          <NotificationOverlay
            open={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
          />
        </div>

        {/* Message Icon */}
        <MessageCircle className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />

        {/* User Info */}
        <div className="flex items-center space-x-2">
          <img
            src={user?.profileImage || defaultUserImage}
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
