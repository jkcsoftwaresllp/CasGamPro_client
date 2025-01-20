import styles from "./style/IconBtn.module.css";

export const IconBtn = ({ icon, label, onClick }) => {
  return (
    <div className={styles.divButton} onClick={onClick}>
      <div className={styles.icon}>{icon}</div> {/* Render the SVG directly */}
      <span className={styles.label}>{label}</span>
    </div>
  );
};
