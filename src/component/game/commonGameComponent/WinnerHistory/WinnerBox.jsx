import React, { useState } from "react";
import style from "./style/WinnerHistory.module.css";
import Cancel from "./images/cancel.svg";

const WinnerBox = ({ winner, roundId, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = (e) => {
    e.stopPropagation(); // Prevents event bubbling
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={style.WinnerBox}
      onClick={() => setShowDetails(!showDetails)}
    >
      {winner}

      {showDetails && (
        <div className={style.SmallWindow}>
          <h4>Round Details</h4>
          <p>
            <strong>Round ID:</strong> {roundId}
          </p>
          <p>
            <strong>Winner:</strong> {winner}
          </p>
          <button
            onClick={toggleDetails}
            className={style.CancelIconButton}
            aria-label="Close details"
          >
            <img src={Cancel} alt="Cancel" />
          </button>
        </div>
      )}
    </div>
  );
};

export default WinnerBox;
