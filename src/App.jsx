import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Main/Header"; // Header component

function App() {
  return (
    <Router>
      {/* Header will be visible on all pages */}
      <Header />
    </Router>
  );
}

export default App;
