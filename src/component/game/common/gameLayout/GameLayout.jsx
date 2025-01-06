import style from "./style/GameLayout.module.css";
import WinnerHistory from "../WinnerHistory/jsx/WinnerHistory";
import Timer from "../Timer/Timer";

const GameLayout = () => {
  return (
    <div className={style.container}>
      <div className={style.menuBar}>Menu Bar</div>
      <div className={style.mainContent}>
        <div className={style.leftSection}>
          <div className={style.gameSimulationWrapper}>
            <div className={style.gameInterface}>Game Interface</div>
            <div className={style.simulationSection}>
              Simulation Section
              <div className={style.timerContainer}>
                <Timer time={20} />
              </div>
            </div>
          </div>
          <div className={style.stakeSection}>Stake Section</div>
        </div>
        <div className={style.rightSection}>
          <div className={style.winnerHistory}>
            <WinnerHistory />
          </div>
          <div className={style.betSection}>Bet Section</div>
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
