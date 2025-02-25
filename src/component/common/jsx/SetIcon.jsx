import styles from "../style/SetIcon.module.css";

export const SetIcon = ({ icon, onClick }) => {
  return (
    <div className={styles.divButton} onClick={onClick}>
      {icon}
    </div>
  );
};
