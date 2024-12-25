import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ClientRegisterPage from "./pages/ClientRegisterPage";
import Header from "./components/Main/Header";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      {/* Header will be visible on all pages */}
      <Header />

      {/* Define all routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/newUser" element={<ClientRegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
