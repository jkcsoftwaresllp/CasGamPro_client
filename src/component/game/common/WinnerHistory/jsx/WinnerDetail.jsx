import React, { useEffect, useState } from "react";
import style from "../style/Window.module.css";
import Cancel from "../images/cancel.svg";
import { DetailCards } from "./DetailCards";
import { apiCall } from "../../../../common/apiCall";
import { CardToPlayer } from "../../cardSection/jsx/CardToPlayer";
import { ButtonIcon } from "@radix-ui/react-icons";

export const WinnerDetail = ({ roundId, gameId, winner, toggleDetails }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchWinningCards = async () => {
      try {
        const apiUrl = `/auth-api/client/games/rounds/${roundId}/winning-history`;
        const result = await apiCall(apiUrl, "GET");
        console.log(result);

        if ((result.uniqueCode = "CGP00G14")) {
          setHistory(result.data);
        } else setHistory({});
      } catch (error) {
        console.error("Error fetching winning cards:", error);
      }
    };

    fetchWinningCards();
  }, [roundId, gameId]);

  const CardRender = ({ name, cards, isCard = true }) => {
    console.log(cards);
    return (
      <div className={style.cardRender}>
        <p className={style.cardRenderName}>{name} : </p>
        {isCard ? (
          <CardToPlayer cards={cards} />
        ) : (
          <DetailCards key={name} cards={cards} />
        )}
      </div>
    );
  };

  return (
    <div className={style.Overlay}>
      <div className={style.SmallWindow}>
        <div className={style.top}>
          <p>Round ID: {history?.roundId}</p>
          <p>Game ID: {history?.gameId}</p>
        </div>
        <div className={style.bottom}>
          {history.playerA && history.playerA.length > 0 && (
            <CardRender key={"A"} name={"A"} cards={history.playerA} />
          )}
          {history.playerB && history.playerB.length > 0 && (
            <CardRender key={"B"} name={"B"} cards={history.playerB} />
          )}
          {history.playerC && history.playerC.length > 0 && (
            <CardRender key={"C"} name={"C"} cards={history.playerC} />
          )}
          {history.winner &&
            (Array.isArray(winner) ? (
              <CardRender
                key={"Winner"}
                name={"Winner"}
                cards={history.winner}
                isCard={false}
              />
            ) : (
              <p className={style.winner}>{history.winner}</p>
            ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDetails();
          }}
          className={style.CancelIconButton}
          aria-label="Close details"
        >
          <img src={Cancel} alt="Cancel" />
        </button>

      </div>
    </div>
  );
};
