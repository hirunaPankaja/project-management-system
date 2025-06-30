import AppRouter from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <AppRouter />
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
