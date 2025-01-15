import styles from "../style/Header.module.css";

export const HeaderBtn = ({ icon, label, onClick }) => {
  return (
    <div className={styles.divButton} onClick={onClick}>
      <img src={icon} alt={label} className={styles.icon} />{" "}
      {/* Use img tag for icon */}
      <span className={styles.label}>{label}</span>
    </div>
  );
};
