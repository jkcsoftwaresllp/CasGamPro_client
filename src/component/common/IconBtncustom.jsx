import styles from "./style/IconBtn.module.css";

export const IconBtncustom = ({ icon, onClick }) => {
  return (
    <div className={styles.divButtonCustom} onClick={onClick}>
      <div className={styles.iconCustom}>{icon}</div>
    </div>
  );
};
