import React, { useState } from "react";
import { NotificationIcon, closeIcon } from "../../../../assets/assets";
import { IconBtn } from "../../../common/IconBtn";
import style from "../styles/Notification.module.css"; // Importing the styles
import { notifications } from "../helper/notificationHelper"; // Importing the notifications

export const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal visibility
  const handleIconClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.notificationContainer}>
      <IconBtn icon={NotificationIcon} onClick={handleIconClick} />

      {/* Notification Modal */}
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <h2 className={style.header}>Notifications</h2>
            {/* Close button with closeIcon positioned at top right */}
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
            <IconBtn icon={closeIcon} onClick={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};
