import { BrowserRouter as Router } from "react-router-dom";
import style from "../styles/App.module.css";
import { Header } from "../../component/layout/jsx/Header";
import { AuthProvider } from "../../context/jsx/AuthContext";
import { Body } from "../../component/layout/jsx/Body";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <div className={style.app}>
          <Header />
          <Body />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
