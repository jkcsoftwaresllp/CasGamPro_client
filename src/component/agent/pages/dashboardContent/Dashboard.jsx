import React, { useState, useEffect } from "react";
import { DashboardCard } from "./jsx/DashboardCard"; // Assuming DashboardCard is imported
import style from "../styles/DashboardCard.module.css";
import { Loader } from "../../../common/Loader";

export const Dashboard = () => {
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

  // State to handle the loading state
  const [loading, setLoading] = useState(true);

  // Simulate an API call or loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after data is "loaded"
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.dashcontent}>
      <h1 className={style.header}>Dashboard</h1>

      {/* Show the loader when loading is true */}
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader /> {/* Loader component */}
        </div>
      ) : (
        <div className={style.cardContainer}>
          {/* Render dashboard cards once data is loaded */}
          {data.map((item, index) => (
            <DashboardCard key={index} label={item.label} value={item.value} />
          ))}
        </div>
      )}
    </div>
  );
};
