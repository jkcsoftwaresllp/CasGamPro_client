import style from "../../style/Rules.module.css";

export const NotificationBox = ({ onClose, notificationText }) => {
  return (
    <div className={style.notification}>
      <div className={style.notificationHeader}>
        Important Notification
        <div className={style.closeButton} onClick={onClose}>
          &times;
        </div>
      </div>
      <div className={style.notificationBody}>{notificationText}</div>
    </div>
  );
};
