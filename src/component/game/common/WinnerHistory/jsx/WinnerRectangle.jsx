import React, { useEffect, useRef } from "react";
import { WinnerBox } from "./WinnerBox";
import style from "../style/WinnerHistory.module.css";

export const WinnerRectangle = ({ results }) => {
  const winnerRectangleRef = useRef(null);

  useEffect(() => {
    if (winnerRectangleRef.current) {
      winnerRectangleRef.current.scrollLeft =
        winnerRectangleRef.current.scrollWidth;
    }
  }, [results]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (winnerRectangleRef.current) {
        if (event.deltaY !== 0) {
          winnerRectangleRef.current.scrollLeft += event.deltaY;
        }
      }
    };

    const currentRef = winnerRectangleRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className={style.WinnerRectangle} ref={winnerRectangleRef}>
      {results.map((result, index) => (
        <WinnerBox
          key={index}
          winner={result.winner}
          gameId={result.gameId}
          roundId={result.roundId}
        />
      ))}
    </div>
  );
};
