import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/notFound.jsx";


const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
