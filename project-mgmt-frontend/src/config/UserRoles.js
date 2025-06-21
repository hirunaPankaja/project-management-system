import { User, HardHat, BarChart2, PenTool, FileText, LayoutDashboard, Hammer, Users } from "lucide-react";

export const userRolesConfig = {
  admin: {
    tiles: [
      { name: "Register Employee", icon: User, color: "bg-yellow-600", path: "admin/register-employee" },
      { name: "Materials", icon: HardHat, color: "bg-orange-500", path: "admin/materials" },
      { name: "Progress", icon: BarChart2, color: "bg-teal-600", path: "admin/progress" }
    ],
    nav: [
      { label: "Dashboard", path: "admin/dashboard", icon: LayoutDashboard },
      { label: "Employees", path: "admin/employees", icon: Users },
      { label: "Reports", path: "admin/reports", icon: BarChart2 }
    ]
  },
  designer: {
    tiles: [
      { name: "Designs", icon: PenTool, color: "bg-yellow-600", path: "designer/designs" },
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