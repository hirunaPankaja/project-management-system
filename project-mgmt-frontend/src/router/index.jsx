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
import PropertyManagerViewProposals from "../pages/propertymanager/PropertyManagerProposals";
import LawyerVerifyProposals from "../pages/lawyer/LawyerVerifyProposals";
import PropertyExecutiveManageOutlets from "../pages/propertyExective/PropertyExecutiveManageOutlets";
import PropertyExecutiveOutletAnalysis from "../pages/propertyExective/PropertyExecutiveOutletAnalysis";
import Contracts from "../pages/supplier/Contracts";
import SupplierDashboard from "../pages/supplier/SupplierDashboard";
import SupplierLogin from "../pages/supplier/SupplierLogin";



const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/supplier-login" element={<SupplierLogin />} />
      <Route path="/supplier-registration" element={<SupplierRegistration />}/>
       
      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<HomeContent />} />
        <Route path="admin/register-employee" element={<RegisterEmployee />} />
        <Route path="admin/search-employee" element={<SearchEmployee />} />
        <Route path="designer/design-pool" element={<Designs />} />

        <Route path="supplier/supplier-dashboard" element={<SupplierDashboard />} />
        <Route path="supplier/product-catalog" element={<SupplierProductCatalog />} />
        <Route path="supplier/contracts" element={<Contracts />} />        
        
        <Route path="propertyofficer/proposal" element={<PropertyOfficerProposal />} />
        <Route path="propertyofficer/feedback" element={<PropertyOfficerFeedback />} />
        <Route path="map" element={<Map />} />

       <Route path="propertymanager/view-proposals" element={<PropertyManagerViewProposals />} />

       <Route path="lawyer/verify-proposals" element={<LawyerVerifyProposals />} />

       <Route path="propertyexecutive/manage-outlets" element={<PropertyExecutiveManageOutlets />} />
       <Route path="propertyexecutive/outlet-analysis" element={<PropertyExecutiveOutletAnalysis />} />



    </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;