import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Main/Header"; // Header component
import Routing from "./Routing"; // Import the Routing component

function App() {
  return (
    <Router>
      {/* Header will be visible on all pages */}
      <Header />

      {/* Use the centralized Routing component */}
      <Routing />
    </Router>
  );
}

export default App;
