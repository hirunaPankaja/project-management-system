import { User, HardHat, BarChart2, PenTool, FileText, LayoutDashboard, Hammer, Users } from "lucide-react";

export const userRolesConfig = {
  admin: {
    tiles: [
      { name: "Register Employee", icon: User, color: "bg-yellow-600", path: "admin/register-employee" },
      { name: "Search Employee", icon: HardHat, color: "bg-orange-500", path: "admin/search-employee" },
    ],
    nav: [
      { label: "Register Employee", path: "admin/register-employee", icon: LayoutDashboard },
      { label: "Search Employee", path: "admin/search-employee", icon: Users },
    ]
  },
  designer: {
    tiles: [
      { name: "Designs Pool", icon: PenTool, color: "bg-yellow-600", path: "designer/designs-pool" },
      { name: "Create", icon: FileText, color: "bg-orange-500", path: "designer/create" },
      { name: "Projects", icon: HardHat, color: "bg-teal-600", path: "designer/projects" }
    ],
    nav: [
      { label: "Dashboard", path: "designer/dashboard", icon: LayoutDashboard },
      { label: "Designs", path: "designer/designs", icon: PenTool },
      { label: "Drafts", path: "designer/drafts", icon: FileText }
    ]
  }
};