import React from "react";
import { Header } from "../../agent/jsx/Header";
import styles from "../styles/CasGamPro.module.css";
import { SideBar } from "../../agent/jsx/SideBar";

export const CasGamPro = () => {
  return (
    <>
      <div className={styles.casGamPro}>
        <Header />
        <div className={styles.mainContent}>
          <SideBar/>
        </div>
      </div>
    </>
  );
};
