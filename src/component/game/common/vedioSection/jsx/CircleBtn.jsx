import styles from "../style/Circlebtn.module.css";

export const CircleButton = ({ label, svg }) => {
  return (
    <div className={styles.circleButton}>
      <img src={svg} alt={label} className={styles.iconContainer} />
    </div>
  );
};
