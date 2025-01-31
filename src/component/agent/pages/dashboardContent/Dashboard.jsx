import React from "react";
import { DashboardCard } from "./jsx/DashboardCard"; // Assuming DashboardCard is imported
import style from "../styles/DashboardCard.module.css";

export const Dashboard = () => {
  // Dummy data for the dashboard cards
  const data = [
    { label: "MY USERNAME", value: "SA85799" },
    { label: "MY NAME", value: "John Doe" },
    { label: "MY LEVEL", value: "SUPER AGENT" },
    { label: "MY FIX LIMIT", value: "18.00" },
    { label: "Company Contact", value: "SST54431" },
    { label: "Maximum My Share", value: "15.0%" },
    { label: "Minimum Company Share", value: "85%" },
    { label: "Match Commission", value: "3" },
    { label: "Session Commission", value: "3" },
  ];

  return (
    <div className={style.dashcontent}>
      <h1 className={style.header}>Dashboard</h1>
      <div className={style.cardContainer}>
        {data.map((item, index) => (
          <DashboardCard key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};
