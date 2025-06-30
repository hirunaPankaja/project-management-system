import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout";
import HomeContent from "../pages/HomeContent";
import LandingPage from "../pages/LandingPage";
import EmployeeLogin from "../pages/EmployeeLogin";
import NotFound from "../pages/NotFound";
import RegisterEmployee from "../pages/admin/RegisterEmployee";
import SearchEmployee from "../pages/admin/SearchEmployee";
import Designs from "../pages/designer/designs";
import SupplierRegistration from "../pages/supplier/SupplierRegistration";
import SupplierProductCatalog from "../pages/supplier/ProductCatalog";
import PropertyOfficerProposal from "../pages/propertyOfficer/PropertyOfficerProposal";
import PropertyOfficerFeedback from "../pages/propertyOfficer/PropertyOfficerFeedback";
import Map from "../pages/Map";
import PropertyManagerViewProposals from "../pages/propertymanager/AllProposals";
import LawyerVerifyProposals from "../pages/lawyer/LawyerVerifyProposals";
import PropertyExecutiveManageOutlets from "../pages/propertyExective/AllOutlets";
import PropertyExecutiveOutletAnalysis from "../pages/propertyExective/OutletAnalysis";
import Contracts from "../pages/supplier/Contracts";
import SupplierDashboard from "../pages/supplier/SupplierDashboard";
import SupplierLogin from "../pages/supplier/SupplierLogin";
import TaskLogsPage from "../pages/civilengineer/TaskLogsPage";
import ManageMeeting from "../pages/ManageMeetingsPage";
import ProjectManagerProjects from "../pages/projectmanager/ProjectSection";
import ProjectDashboard from "../pages/projectmanager/ProjectDashboard";
import ProjectReport from "../pages/projectmanager/ProjectReport";
import ProjectDetails from "../pages/ProjectDetails";
import ProjectSection from "../pages/projectmanager/ProjectSection";

// ✅ Import your new pages:
import ProjectOverviewPage from "../pages/ProjectOverviewPage";
import ProjectDashboardPage from "../pages/ProjectDashboardPage";
import AssignTaskPage from "../pages/AssignTaskPage";
import MyProposals from "../pages/propertyOfficer/MyProposals";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/supplier-login" element={<SupplierLogin />} />
      <Route path="/supplier-registration" element={<SupplierRegistration />} />

      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<HomeContent />} />
        <Route path="admin/register-employee" element={<RegisterEmployee />} />
        <Route path="admin/search-employee" element={<SearchEmployee />} />
        <Route path="designer/design-pool" element={<Designs />} />

        <Route path="supplier/supplier-dashboard" element={<SupplierDashboard />} />
        <Route path="supplier/product-catalog" element={<SupplierProductCatalog />} />
        <Route path="supplier/contracts" element={<Contracts />} />

        <Route path="propertyofficer/proposal" element={<MyProposals />} />
        <Route path="propertyofficer/feedback" element={<PropertyOfficerFeedback />} />
        <Route path="map" element={<Map />} />

        <Route path="propertymanager/view-proposals" element={<PropertyManagerViewProposals />} />

        <Route path="lawyer/verify-proposals" element={<LawyerVerifyProposals />} />

        <Route path="propertyexecutive/manage-outlets" element={<PropertyExecutiveManageOutlets />} />
        <Route path="propertyexecutive/outlet-analysis" element={<PropertyExecutiveOutletAnalysis />} />

        <Route path="civilengineer/task-logs" element={<TaskLogsPage />} />

        <Route path="managemeetings" element={<ManageMeeting />} />

        <Route path="project-manager/projects" element={<ProjectManagerProjects />} />

        <Route path="project-manager/dashboard" element={<ProjectDashboard />} />

        <Route path="project-manager/report" element={<ProjectReport />} />
        <Route path="project-manager/project" element={<ProjectSection />} />

        <Route path="projects">
         <Route index element={<ProjectOverviewPage />} />
              <Route path=":projectId" element={<ProjectDashboardPage />} />
  <Route
    path=":projectId/tasks/:taskId"
    element={<AssignTaskPage managerType="design-manager" />}
  />
  <Route
    path=":projectId/tasks/:taskId/arch"
    element={<AssignTaskPage managerType="architecture-manager" />}
  />
</Route>
      </Route>

      {/* Standalone route outside HomeLayout */}
      <Route path="project/:projectId" element={<ProjectDetails />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
