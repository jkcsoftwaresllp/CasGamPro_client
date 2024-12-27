import style from "./style/WinnerHistory.module.css";

const WinnerBox = ({ winner }) => {
  return <div className={style.WinnerBox}>{winner}</div>;
};

export default WinnerBox;
