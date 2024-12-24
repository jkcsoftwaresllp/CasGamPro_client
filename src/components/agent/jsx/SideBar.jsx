import React from "react";
import styles from "../styles/SideBar.module.css";
import { SideTab } from "./SideTab";

export const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.label}>Navigation Bar</div>
      <div className={styles.sideTabList}>
        <SideTab onClick={() => console.log("Home Clicked")} title={"Home"} />
        <SideTab
          onClick={() => console.log("Add Client Clicked")}
          title={"Add Client"}
        />
        <SideTab
          onClick={() => console.log("All Client Clicked")}
          title={"All Clients"}
        />
      </div>
    </div>
  );
};
