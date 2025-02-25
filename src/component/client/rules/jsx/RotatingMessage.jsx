import React, { useEffect, useState } from "react";
import style from "../style/Rules.module.css";
export const RotatingMessage = () => {
  const [notifications, setNotifications] = useState(
    "No notifications available."
  );

  useEffect(() => {
    // TODO: Fetch notifications from the server
  }, []);

  return (
    <div className={style.rotateContainer}>
      <div className={style.rotating}>{notifications}</div>
    </div>
  );
};
