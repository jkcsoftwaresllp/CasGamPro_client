import { BrowserRouter as Router } from "react-router-dom";
import { AgentSidebar as Sidebar } from "../main/jsx/AgentSidebar";
import style from "./styles/ContentPage.module.css";
import { AgentDashRoutes } from "./helper/AgentDashRoutes";

export const AgentDashboard = () => {
  return (
    <div className={style.pageContainer}>
      <Sidebar />
      <div className={style.content}>
        <AgentDashRoutes />
      </div>
    </div>
  );
};
