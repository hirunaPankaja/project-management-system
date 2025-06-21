import { Link } from "react-router-dom";
import { userRolesConfig } from "../../config/UserRoles";
import { useState, useEffect, useRef } from "react";

export default function SideHeader({ role }) {
  const [expanded, setExpanded] = useState(false);
  const timeoutRef = useRef(null);
  const navItems = userRolesConfig[role]?.nav || [];

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 1000); // 1 second delay before auto-collapse
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`bg-white shadow transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-20'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4">
        {expanded && <h2 className="text-xl font-semibold">Navigation</h2>}
        <nav className="mt-4">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-2">
                <Link 
                  to={`/home/${item.path}`} 
                  className="flex items-center p-2 rounded hover:bg-gray-100"
                  title={!expanded ? item.label : ''}
                >
                  <item.icon className="w-5 h-5" />
                  {expanded && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}