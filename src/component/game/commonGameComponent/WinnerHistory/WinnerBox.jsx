import style from "./style/WinnerHistory.module.css";

const WinnerBox = ({ winner, roundId, onClick }) => {
  return (
    <div
      className={style.WinnerBox}
      // onClick={() => onClick && onClick(roundId)}
    >
      {winner}
    </div>
  );
};

export default WinnerBox;
