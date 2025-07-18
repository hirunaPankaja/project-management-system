import {
  User,
  HardHat,
  BarChart2,
  PenTool,
  FileText,
  LayoutDashboard,
  Hammer,
  Users,
  MessageSquare,
  Eye,
  FileCheck2,
  FileBarChart2,
  Store,
  Map,
  ClipboardList,
  CalendarClock,
  FolderKanban
} from "lucide-react";

export const userRolesConfig = {
  admin: {
    tiles: [
      {
        name: "Register Employee",
        icon: User,
        color: "bg-yellow-600",
        path: "admin/register-employee"
      },
      {
        name: "Manage Employee",
        icon: HardHat,
        color: "bg-orange-500",
        path: "admin/search-employee"
      }
    ],
    nav: [
      {
        label: "Register Employee",
        path: "admin/register-employee",
        icon: LayoutDashboard
      },
      {
        label: "Manage Employee",
        path: "admin/search-employee",
        icon: Users
      }
    ]
  },

  supplier: {
    tiles: [
      {
        name: "Supplier Dashboard",
        icon: Hammer,
        color: "bg-yellow-600",
        path: "supplier/supplier-dashboard"
      },
      {
        name: "Product Catalog",
        icon: BarChart2,
        color: "bg-orange-500",
        path: "supplier/product-catalog"
      },
      {
        name: "Contracts",
        icon: Hammer,
        color: "bg-teal-600",
        path: "supplier/contracts"
      }
    ],
    nav: [
      {
        label: "Supplier Dashboard",
        path: "supplier/supplier-dashboard",
        icon: Hammer
      },
      {
        label: "Product Catalog",
        path: "supplier/product-catalog",
        icon: BarChart2
      },
      {
        label: "Contracts",
        path: "supplier/contracts",
        icon: Hammer
      }
    ]
  },

  designer: {
    tiles: [
      {
        name: "Designs Pool",
        icon: PenTool,
        color: "bg-yellow-600",
        path: "designer/designs-pool"
      },
      {
        name: "Create ",
        icon: FileText,
        color: "bg-orange-500",
        path: "designer/create"
      },
      {
        name: "Projects",
        icon: HardHat,
        color: "bg-teal-600",
        path: "designer/projects"
      },  {
        name: "Map",
        icon: Map,
        color: "bg-blue-500",
        path: "map"
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
      }
    ],
    nav: [
      {
        label: "Dashboard",
        path: "designer/dashboard",
        icon: LayoutDashboard
      },
      {
        label: "Designs",
        path: "designer/designs",
        icon: PenTool
      },
      {
        label: "Drafts",
        path: "designer/drafts",
        icon: FileText
      },
       {
        label: "Map",
        path: "map",
        icon: Map
      },
      {
        label: "Map",
        path: "map",
        icon: Map
      },
    ]
  },

  property_officer: {
    tiles: [
      {
        name: "Proposal",
        icon: FileText,
        color: "bg-green-600",
        path: "propertyofficer/proposal"
      },
        {
        name: "Map",
        icon: Map,
        color: "bg-blue-500",
        path: "map"
      }
      ,
         {
        name: "View Feedback",
        icon: MessageSquare,
        color: "bg-blue-500",
        path: "propertyofficer/feedback"
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
      }
    ],
    nav: [
      {
        label: "Proposals",
        path: "propertyofficer/proposal",
        icon: FileText
      },
       {
        label: "Map",
        path: "map",
        icon: Map
      },
      {
        label: "View Feedback",
        path: "propertyofficer/feedback",
        icon: MessageSquare
      },
      {
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
      }
    
    ]
  },

  property_manager: {
    tiles: [
      {
        name: "View Proposals",
        icon: Eye,
        color: "bg-blue-600",
        path: "propertymanager/proposals"
      },
       {
        name: "Proposals Dashboard",
        icon: Eye,
        color: "bg-blue-600",
        path: "propertymanager/proposals-dashboard"
      },
        {
        name: "Map",
        icon: Map,
        color: "bg-blue-500",
        path: "map"
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
      }
    ],
    nav: [
      {
        label: "Proposals Dashboard",
        path: "propertymanager/proposals-dashboard",
        icon: FileText
      },  {
        label: "Proposals",
        path: "propertymanager/proposals",
        icon: FileText
      },
       {
        label: "Map",
        path: "map",
        icon: Map
      },
      {
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
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
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
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
      },
      {
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
      }
    ]
  },

  property_executive: {
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
      },
        {
        name: "Map",
        icon: Map,
        color: "bg-blue-500",
        path: "map"
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
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
      },
       {
        label: "Map",
        path: "map",
        icon: Map
      },
      {
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
      }
    ]
  },

  civilEngineer: {
    tiles: [
      {
        name: "Task Logs",
        icon: ClipboardList,
        color: "bg-green-600",
        path: "civilengineer/task-logs"
      },
      {
        name: "Map",
        icon: Map,
        color: "bg-blue-500",
        path: "map"
      },
        {
        name: "Map",
        icon: Map,
        color: "bg-blue-500",
        path: "map"
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
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
      },
       {
        label: "Map",
        path: "map",
        icon: Map
      },
      {
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
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
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
      }, {
        label: "Map",
        path: "map",
        icon: Map
      }
    ]
  },

   design_manager: {
    tiles: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        color: "bg-indigo-600",
        path: "project-manager/dashboard"
      },
      {
        name: "Projects",
        icon: FolderKanban,
        color: "bg-blue-600",
        path: "projects"
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
      },
      {
        name: "Report",
        icon: FileBarChart2,
        color: "bg-green-600",
        path: "project-manager/report"
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
        label: "Dashboard",
        path: "project-manager/dashboard",
        icon: LayoutDashboard
      },
      {
        label: "Projects",
        path: "projects",
        icon: FolderKanban
      },
      {
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
      },
      {
        label: "Report",
        path: "project-manager/report",
        icon: FileBarChart2
      },
       {
        label: "Map",
        path: "map",
        icon: Map
      }
    ]
  },
  project_manager: {
    tiles: [
      {
        name: "Project Dashboard",
        icon: LayoutDashboard,
        color: "bg-indigo-600",
        path: "project-manager/dashboard"
      },
      {
        name: "Projects",
        icon: FolderKanban,
        color: "bg-blue-600",
        path: "project-manager/projects"
      },
      {
        name: "Manage Meetings",
        icon: CalendarClock,
        color: "bg-indigo-600",
        path: "managemeetings"
      },
        {
        name: "Map",
        icon: Map,
        color: "bg-blue-500",
        path: "map"
      },
      {
        name: "Report",
        icon: FileBarChart2,
        color: "bg-green-600",
        path: "project-manager/report"
      }
    ],
    nav: [
      {
        label: "Dashboard",
        path: "project-manager/dashboard",
        icon: LayoutDashboard
      },
      {
        label: "Projects",
        path: "project-manager/projects",
        icon: FolderKanban
      },
      {
        label: "Meetings",
        path: "managemeetings",
        icon: CalendarClock
      },
      {
        label: "Report",
        path: "project-manager/report",
        icon: FileBarChart2
      }, {
        label: "Map",
        path: "map",
        icon: Map
      }
    ]
  }
};
