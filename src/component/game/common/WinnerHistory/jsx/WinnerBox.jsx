import React, { useState } from "react";
import style from "../style/WinnerHistory.module.css";
import { WinnerDetail } from "./WinnerDetail";

export const WinnerBox = ({ winner, roundId, gameName }) => {
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
        <WinnerDetail
          roundId={roundId}
          gameName={gameName}
          winner={winner}
          toggleDetails={toggleDetails}
        />
      )}
    </div>
  );
};

