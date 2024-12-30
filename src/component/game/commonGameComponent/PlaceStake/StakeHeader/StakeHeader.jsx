import style from "./style/StakeHeader.module.css";

const StakeHeader = () => {
  return (
    <div className={style.header}>
      <div className={style.left}>PLACE BET</div>
      <div className={style.right}>Range - 100 to 5000</div>
    </div>
  );
};

export default StakeHeader;
