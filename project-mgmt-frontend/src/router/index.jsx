import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/notFound.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import EmployeeLogin from "../pages/EmployeeLogin.jsx";
import TEST from "../pages/test.jsx"; 


const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/home" element={<TEST />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
