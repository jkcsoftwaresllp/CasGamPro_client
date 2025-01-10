import { BrowserRouter as Router } from "react-router-dom";
import style from "../styles/App.module.css";
import { Header } from "../../component/common/Header"; // Header component
import { Routing } from "./Routing"; // Import the Routing component
import { UserContextProvider } from "../../context/userContext/UserContext"; // Import the UserContextProvider

function App() {
  return (
    <div className={style.app}>
      <UserContextProvider>
        <Router>
          <Header />
          <Routing />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
