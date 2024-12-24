import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ClientRegisterPage from "./pages/ClientRegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/admin/newUser" element={<ClientRegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
