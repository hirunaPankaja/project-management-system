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
import PropertyOfficerDashboard from "../pages/propertyOfficer/PropertyOfficerDashboard";
import PropertyOfficerProposal from "../pages/propertyOfficer/PropertyOfficerProposal";
import PropertyOfficerFeedback from "../pages/propertyOfficer/PropertyOfficerFeedback";

import SupplierProductCatalog from "../pages/supplier/ProductCatalog";



const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/supplier-registration" element={<SupplierRegistration />}/>
       
      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<HomeContent />} />
        <Route path="admin/register-employee" element={<RegisterEmployee />} />
        <Route path="admin/search-employee" element={<SearchEmployee />} />
        <Route path="designer/design-pool" element={<Designs />} />

        <Route path="supplier/supplier-dashboard" element={<SupplierRegistration />} />
        <Route path="supplier/product-catalog" element={<SupplierProductCatalog />} />
        <Route path="supplier/contracts" element={<SupplierRegistration />} />        


        {/* Property Officer Routes */}
      <Route path="/propertyofficer/dashboard" element={<PropertyOfficerDashboard />} />
      <Route path="/propertyofficer/proposal" element={<PropertyOfficerProposal />} />
      <Route path="/propertyofficer/feedback" element={<PropertyOfficerFeedback />} />

        <Route path="supplier/supplier-dashboard" element={<SupplierRegistration />} />
        <Route path="supplier/product-catalog" element={<SupplierProductCatalog />} />
        <Route path="supplier/contracts" element={<SupplierRegistration />} />        


      </Route>



      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;