import { useState } from "react";
import { CardDetails } from "./CardDetails";
import { SimulationWindow } from "./SimulationWindow";

export const SimulationSection = () => {
  const [playerACards, setPlayerACards] = useState([]); // Cards for Player A
  const [playerBCards, setPlayerBCards] = useState([]); // Cards for Player B

  return (
    <div>
      <CardDetails playerACards={playerACards} playerBCards={playerBCards} />
      <SimulationWindow
        setPlayerACards={setPlayerACards}
        setPlayerBCards={setPlayerBCards}
      />
    </div>
  );
};
