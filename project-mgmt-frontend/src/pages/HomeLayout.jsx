import { Outlet } from "react-router-dom";
import TopHeader from "../components/header/TopHeader";
import SideHeader from "../components/header/SideHeader";

export default function HomeLayout() {
  const user = { 
    id: 1,
    name: "John Doe",
    empId: "EMP123",
    role: "propertyofficer",

   };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopHeader user={user} />
      <div className="flex flex-1">
        <SideHeader role={user.role} />
        <main className="flex-1 p-5 mt-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}