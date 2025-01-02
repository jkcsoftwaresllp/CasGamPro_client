import styles from "../styles/BetPlacing.module.css";

const LockOverlay = () => {
  return (
    <div
      className={styles.lockOverlay}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="#ea4444"
          d="M4 22V8h3V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h3v14zm8-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"
        ></path>
      </svg>
    </div>
  );
};

export default LockOverlay;
