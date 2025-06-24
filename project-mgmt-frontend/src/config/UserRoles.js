import { User, HardHat, BarChart2, PenTool, FileText, LayoutDashboard, Hammer, Users,MessageSquare } from "lucide-react";

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
  supplier: {
    tiles: [
      { name: "Supplier Dashboard", icon: Hammer, color: "bg-yellow-600", path: "supplier/supplier-dashboard" },
      { name: "Product Catalog", icon: BarChart2, color: "bg-orange-500", path: "supplier/product-catalog" },
      { name: "Contracts", icon: Hammer, color: "bg-teal-600", path: "supplier/contracts" },
    ],
    nav: [
      { label: "Supplier Registration", path: "supplier/supplier-dashboard", icon: Hammer },
      { label: "Product Catalog", path: "supplier/product-catalog", icon: BarChart2 },
      { label: "Contracts", path: "supplier/contracts", icon: Hammer }
    ] 
  },
  designer: {
    tiles: [
      { name: "Designs Pool", icon: PenTool, color: "bg-yellow-600", path: "designer/designs-pool" },
      { name: "Create ", icon: FileText, color: "bg-orange-500", path: "designer/create" },
      { name: "Projects", icon: HardHat, color: "bg-teal-600", path: "designer/projects" }
    ],
    nav: [
      { label: "Dashboard", path: "designer/dashboard", icon: LayoutDashboard },
      { label: "Designs", path: "designer/designs", icon: PenTool },
      { label: "Drafts", path: "designer/drafts", icon: FileText }
    ]
  },
propertyofficer: {
    tiles: [
      { name: "Submit Proposal", icon: FileText, color: "bg-green-600", path: "propertyofficer/proposal" },
      { name: "View Feedback", icon: MessageSquare, color: "bg-green-400", path: "propertyofficer/feedback" },
    ],
    nav: [
      { label: "Proposals", path: "propertyofficer/proposal", icon: FileText },
      { label: "Feedback", path: "propertyofficer/feedback", icon: MessageSquare },
    ]
  }
};