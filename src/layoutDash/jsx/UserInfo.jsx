import React from "react";
import styles from "../style/Header.module.css"; // Import CSS module

export const UserInfo = ({ userId, userName, walletPoints }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.userDetail}>{userId}</div>
        <div className={styles.userDetail}>{userName}</div>
      </div>
      <div className={styles.balanceColumn}>
        <div>
          <strong>Balance:</strong> {walletPoints}
        </div>
      </div>
    </div>
  );
};
