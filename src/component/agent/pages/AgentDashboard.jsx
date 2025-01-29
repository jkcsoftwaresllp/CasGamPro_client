import { AgentSidebar as Sidebar } from "../main/jsx/AgentSidebar";
import style from "./styles/ContentPage.module.css";
import { Outlet } from "react-router-dom";

export const AgentDashboard = () => {
  return (
    <div className={style.pageContainer}>
      <Sidebar />
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
};
