import { User, HardHat, BarChart2, PenTool, FileText, LayoutDashboard, Hammer, Users,MessageSquare,Eye, FileCheck2 , FileBarChart2 ,Store , Map , ClipboardList, CalendarClock} from "lucide-react";

export const userRolesConfig = {
  admin: {
    tiles: [
      { name: "Register Employee", icon: User, color: "bg-yellow-600", path: "admin/register-employee" },
      { name: "Manage Employee", icon: HardHat, color: "bg-orange-500", path: "admin/search-employee" },
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
      { name: "Proposal", icon: FileText, color: "bg-green-600", path: "propertyofficer/proposal" },
      { name: "View Feedback", icon: MessageSquare, color: "bg-yellow-400", path: "propertyofficer/feedback" },
    ],
    nav: [
      { label: "Proposals", path: "propertyofficer/proposal", icon: FileText },
      { label: "Feedback", path: "propertyofficer/feedback", icon: MessageSquare },
    ]
  },

 propertymanager: {
  tiles: [
    {
      name: "View Proposals",
      icon: Eye,
      color: "bg-blue-600",
      path: "propertymanager/view-proposals"
    }
  ],
  nav: [
    {
      label: "View Proposals",
      path: "propertymanager/view-proposals",
      icon: FileText
    }
  ]
},
lawyer: {
  tiles: [
    {
      name: "Verify Proposals",
      icon: FileCheck2,
      color: "bg-purple-600",
      path: "lawyer/verify-proposals"
    },
    {
      name: "Map",
      icon: Map, 
      color: "bg-blue-500",
      path: "map"
    }
  ],
  nav: [
    {
      label: "Verify Proposals",
      path: "lawyer/verify-proposals",
      icon: FileCheck2
    },
    {
      label: "Map",
      path: "map",
      icon: Map 
    }
  ]
},

    propertyexecutive: {
    tiles: [
      {
        name: "Manage Outlets",
        icon: Store,
        color: "bg-blue-600",
        path: "propertyexecutive/manage-outlets"
      },
      {
        name: "Outlet Analysis",
        icon: FileBarChart2,
        color: "bg-purple-600",
        path: "propertyexecutive/outlet-analysis"
      }
    ],
    nav: [
      {
        label: "Manage Outlets",
        path: "propertyexecutive/manage-outlets",
        icon: Store
      },
      {
        label: "Outlet Analysis",
        path: "propertyexecutive/outlet-analysis",
        icon: FileBarChart2
      }
    ]
  },

  civilEngineer: {
  tiles: [
    {
      name: "Task Logs",
      icon: ClipboardList, // use any relevant icon
      color: "bg-green-600",
      path: "civilengineer/task-logs"
    },
    {
      name: "Map",
      icon: Map, 
      color: "bg-blue-500",
      path: "map"
    }
  ],
  nav: [
    {
      label: "Task Logs",
      path: "civilengineer/task-logs",
      icon: ClipboardList
    },
     {
      label: "Map",
      path: "map",
      icon: Map 
    }
  ]
},

headOfDepartment: {
  tiles: [
    {
      name: "Manage Meetings",
      icon: CalendarClock,
      color: "bg-indigo-600",
      path: "managemeetings"
    }
  ],
  nav: [
    {
      label: "Meetings",
      path: "managemeetings",
      icon: CalendarClock
    }
  ]
}


};