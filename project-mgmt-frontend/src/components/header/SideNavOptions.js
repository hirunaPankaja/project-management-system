import { PenTool, FileText, LayoutDashboard, Hammer, BarChart2, Users } from "lucide-react";

export const adminNav = [
  { label: "Dashboard", path: "/designer/dashboard", icon: LayoutDashboard },
  { label: "Designs", path: "/designer/designs", icon: PenTool },
  { label: "Drafts", path: "/designer/drafts", icon: FileText },
];

export const designerNav = [
  { label: "Dashboard", path: "/engineer/dashboard", icon: LayoutDashboard },
  { label: "Tasks", path: "/engineer/tasks", icon: Hammer },
  { label: "Reports", path: "/engineer/reports", icon: BarChart2 },
];

export const managerNav = [
  { label: "Dashboard", path: "/manager/dashboard", icon: LayoutDashboard },
  { label: "Team", path: "/manager/team", icon: Users },
  { label: "Reports", path: "/manager/reports", icon: BarChart2 },
];
export const engineerNav = [
  { label: "Dashboard", path: "/manager/dashboard", icon: LayoutDashboard },
  { label: "Team", path: "/manager/team", icon: Users },
  { label: "Reports", path: "/manager/reports", icon: BarChart2 },
];