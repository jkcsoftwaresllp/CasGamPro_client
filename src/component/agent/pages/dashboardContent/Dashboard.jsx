import React from "react";
import { DashboardCard } from "./jsx/DashboardCard"; // Assuming DashboardCard is imported
import style from "../styles/DashboardCard.module.css";
import { Loader } from "../../../common/Loader";
import { useDashboardData } from "./helper/dashboard"; // Import the helper

export const Dashboard = () => {
  const { loading, data } = useDashboardData(); // Use the helper hook

  return (
    <div className={style.dashcontent}>
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
