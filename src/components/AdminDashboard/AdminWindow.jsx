// Window.js
import React from "react";
import ManageClients from "./ManageClients";
import ManagePassword from "./ManagePassword";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import style from "./styles/AdminWindow.module.css";

const AdminWindow = ({ selectedOption }) => {
  const optionComponents = {
    manageClients: <ManageClients />,
    managePassword: <ManagePassword />,
    dashboard: <Dashboard />,
    settings: <Settings />,
  };

  return (
    <div className={style.window}>
      {optionComponents[selectedOption] || (
        <div>Select an option from the sidebar</div>
      )}
    </div>
  );
};

export default AdminWindow;
