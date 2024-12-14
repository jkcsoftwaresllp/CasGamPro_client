import { useState } from "react";
import { CardDetails } from "./CardDetails";
import { SimulationWindow } from "./SimulationWindow";
import styles from "./css/TeenPatti.module.css";

export const SimulationSection = ({ isAcceptingBets }) => {
  const [playerACards, setPlayerACards] = useState([]); // Cards for Player A
  const [playerBCards, setPlayerBCards] = useState([]); // Cards for Player B

  return (
    <div className={styles.cardSimulation}>
      <CardDetails playerACards={playerACards} playerBCards={playerBCards} />
      <SimulationWindow
        setPlayerACards={setPlayerACards}
        setPlayerBCards={setPlayerBCards}
        isAcceptingBets={isAcceptingBets}
      />
    </div>
  );
};
