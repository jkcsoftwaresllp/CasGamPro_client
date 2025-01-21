import React, { useEffect, useState } from "react";
import { fetchNotifications } from "./helper/notificationHelper"; // Import the helper function
import style from "../../style/Rules.module.css";
export const RotatingMessage = () => {
  const [notifications, setNotifications] = useState("");

  useEffect(() => {
    const getNotifications = async () => {
      const fetchedNotifications = await fetchNotifications();
      // Join notifications with a bullet separator
      const formattedNotifications = fetchedNotifications.join(" ♦ ");
      setNotifications(formattedNotifications || "No notifications available.");
    };

    getNotifications();
  }, []);

  return (
    <div className={style.rotateContainer}>
      <div className={style.rotating}>{notifications}</div>
    </div>
  );
};
