import React, { useState } from "react";
import style from "../style/WinnerHistory.module.css";
import WinnerDetails from "./WinnerDetail";

const WinnerBox = ({ winner, roundId, gameId }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = (e) => {
    e?.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={style.WinnerBox}
      onClick={() => setShowDetails(!showDetails)}
    >
      {winner}

      {showDetails && (
        <WinnerDetails
          roundId={roundId}
          gameId={gameId}
          winner={winner}
          toggleDetails={toggleDetails}
        />
      )}
    </div>
  );
};

export default WinnerBox;
