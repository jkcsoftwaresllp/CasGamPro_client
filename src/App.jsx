import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Main/Header"; // Header component
import Routing from "./pages/jsx/Routing";

function App() {
  return (
    <Router>
      {/* Header will be visible on all pages */}
      <Header />
      <Routing />
    </Router>
  );
}

export default App;
