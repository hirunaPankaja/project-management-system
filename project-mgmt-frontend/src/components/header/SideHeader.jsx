// components/layout/SideHeader.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  designerNav,
  engineerNav,
  managerNav,
  adminNav,
} from "./SideNavOptions";

export default function SideHeader({ role = "designer" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  let navItems = [];
  switch (role) {
    case "designer":
      navItems = designerNav;
      break;
    case "engineer":
      navItems = engineerNav;
      break;
    case "manager":
      navItems = managerNav;
      break;
    case "admin":
      navItems = adminNav;
      break;
    default:
      navItems = [];
  }

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsExpanded(false);
    }, 1500); // auto-collapse after 1.5s
    setTimeoutId(id);
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-in-out bg-white shadow-lg h-screen 
        ${isExpanded ? "w-64" : "w-16"} fixed md:static z-10`}
    >
      <div className="p-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center p-2 rounded-md text-gray-700 hover:bg-emerald-100 transition-all"
          >
            <item.icon className="w-6 h-6 text-emerald-600" />
            {isExpanded && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}
