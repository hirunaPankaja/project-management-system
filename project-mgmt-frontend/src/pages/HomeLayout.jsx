import { Outlet } from "react-router-dom";
import TopHeader from "../components/header/TopHeader";
import SideHeader from "../components/header/SideHeader";

export default function HomeLayout() {
  const user = { 
    id: localStorage.getItem("empId"),
    name: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"),
    empId: localStorage.getItem("empId"),
    jobRole: localStorage.getItem("jobRole"),

   };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopHeader user={user} />
      <div className="flex flex-1">
        <SideHeader jobRole={user.jobRole} />
        <main className="flex-1 p-5 mt-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}