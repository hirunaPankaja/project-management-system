import { useEffect, useRef } from "react";

export default function NotificationOverlay({ open, onClose, notifications = [] }) {
  const overlayRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const typeColors = {
    meeting: "bg-blue-100 text-blue-700",
    system: "bg-gray-100 text-gray-700",
    reminder: "bg-emerald-100 text-emerald-700",
    alert: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 border"
    >
      <div className="p-4 border-b font-semibold">Notifications</div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">No notifications</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="px-4 py-3 border-b last:border-b-0 flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    typeColors[n.type] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                </span>
                <span className="text-xs text-gray-400 ml-auto">{n.time}</span>
              </div>
              <div className="text-sm">{n.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
