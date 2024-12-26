import { Routes, Route } from "react-router-dom";

// Import page components
import LoginPage from "./pages/LoginPage";
import ClientRegistration from "./pages/Agent-newUser";
import Home from "./pages/Home";
import AgentDashboard from "./pages/AgentDashboard/AdminDashboard";

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<ClientRegistration />} />
      <Route path="/agent" element={<AgentDashboard />} />
    </Routes>
  );
};

export default Routing;
