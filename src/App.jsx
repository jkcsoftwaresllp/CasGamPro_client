// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage"; // Login page component
import ClientRegisterPage from "./pages/ClientRegisterPage"; // New client registration page component
import Header from "./components/Main/Header"; // Header component
import Home from "./pages/Home"; // Home page component
import Page from "./pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <Router>
      {/* Header will be visible on all pages */}
      <Header />

      {/* Define all routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/newUser" element={<ClientRegisterPage />} />
        {/* Protected routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Page />} /> {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
