import style from "../../style/Rules.module.css";

export const NotificationBox = ({ onClose }) => {
  return (
    <div className={style.notification}>
      <div className={style.notificationHeader}>
        Important Notification
        <div className={style.closeButton} onClick={onClose}>
          &times;
        </div>
      </div>
      <div className={style.notificationBody}>
        This is an important notification! Please take note of the following
        rules and guidelines.
      </div>
    </div>
  );
};
