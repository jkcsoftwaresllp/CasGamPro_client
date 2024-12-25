import { Routes, Route } from "react-router-dom";

// Import page components
import LoginPage from "./pages/LoginPage";
import ClientRegistration from "./pages/ClientRegisterPage";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<ClientRegistration />} />
      <Route path="/Admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default Routing;
