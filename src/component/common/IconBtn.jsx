import styles from "./style/IconBtn.module.css";

export const IconBtn = ({ icon, label, onClick }) => {
  return (
    <div className={styles.divButton} onClick={onClick}>
      <img src={icon} alt={label} className={styles.icon} />{" "}
      {/* Use img tag for icon */}
      <span className={styles.label}>{label}</span>
    </div>
  );
};
