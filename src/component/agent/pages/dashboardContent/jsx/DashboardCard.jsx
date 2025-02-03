import styles from "../../styles/DashboardCard.module.css";
export const DashboardCard = ({ label, value }) => {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
