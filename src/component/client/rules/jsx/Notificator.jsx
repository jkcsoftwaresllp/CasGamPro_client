import { useState } from "react";
import style from "../style/Rules.module.css";
import { NotificationBox } from "./NotificationBox";

export const Notificator = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(true);

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <div className={style.container}>
      {/* Notification Modal */}
      {isNotificationVisible && (
        <NotificationBox
          onClose={hideNotification}
          notificationText="This is an important notification! Please take note of the following
        rules and guidelines carefully read kre."
        />
      )}
    </div>
  );
};
