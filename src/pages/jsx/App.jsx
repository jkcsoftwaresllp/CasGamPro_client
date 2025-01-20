import { BrowserRouter as Router } from "react-router-dom";
import style from "../styles/App.module.css";
import { Routing } from "./Routing"; // Import the Routing component
import { Header } from "../../component/layout/jsx/Header";
import { AuthProvider } from "../../context/jsx/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={style.app}>
          <Header />
          <Routing />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
