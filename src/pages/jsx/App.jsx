import { BrowserRouter as Router } from "react-router-dom";
import style from "../styles/App.module.css";
import { Routing } from "./Routing"; // Import the Routing component
import { UserContextProvider } from "../../context/userContext/UserContext"; // Import the UserContextProvider
import { Header } from "../../component/layout/jsx/Header";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className={style.app}>
          <Header />
          <Routing />
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
