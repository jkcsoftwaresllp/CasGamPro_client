import { useEffect, useState } from "react";
import style from "../style/Rules.module.css";
import { closeIcon } from "../../../../assets/assets";

export const NotificationBox = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Fetch notifications from the server
  }, []);

  return (
    <div className={style.notification}>
      <div className={style.notificationHeader}>
        Important Notifications
        <div className={style.closeButton} onClick={onClose}>
          {closeIcon}
        </div>
      </div>
      <div className={style.notificationBody}>
        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
