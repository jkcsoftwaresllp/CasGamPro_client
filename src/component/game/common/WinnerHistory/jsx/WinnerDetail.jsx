import React, { useEffect, useState } from "react";
import style from "../style/Window.module.css";
import { DetailCards } from "./DetailCards";
import { apiCall } from "../../../../common/apiCall";
import { CardToPlayer } from "../../cardSection/jsx/CardToPlayer";
import { SetIcon } from "../../../../common/jsx/SetIcon";
import { cancelIcon } from "../../../../../assets/assets";
import { getPlayerNames } from "./getPlayerNames";

const getPrefixBeforeUnderscore = (roundId) => {
  return roundId.split("_")[0];
};

export const WinnerDetail = ({ roundId, gameName, winner, toggleDetails }) => {
  const [history, setHistory] = useState([]);

  const gameId = getPrefixBeforeUnderscore(roundId);
  const [playerA, playerB, playerC] = getPlayerNames(gameId);

  useEffect(() => {
    const fetchWinningCards = async () => {
      try {
        const apiUrl = `/auth-api/client/games/rounds/${roundId}/winning-history`;
        const result = await apiCall(apiUrl, "GET");

        console.log("Reponse API for Winner Details: ", result);

        if ((result.uniqueCode = "CGP00G14")) {
          setHistory(result.data);
        } else setHistory({});
      } catch (error) {
        console.error("Error fetching winning cards:", error);
      }
    };

    fetchWinningCards();
  }, [roundId]);

  const CardRender = ({ name, cards, isCard = true }) => {
    return (
      <div className={style.cardRender}>
        <p className={style.cardRenderName}>{name} : </p>
        <div className={style.cardRenderCard}>
          {isCard ? (
            <CardToPlayer cards={cards} />
          ) : (
            <DetailCards key={name} cards={cards} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={style.Overlay}>
      <div className={style.SmallWindow}>
        <div className={style.top}>
          <p>Round ID: {history?.roundId}</p>
          <p>Game ID: {gameName}</p>
        </div>
        <div className={style.bottom}>
          {history.jokerCard && (
            <CardRender
              key={"Joker"}
              name={"Jocker"}
              cards={[history.jokerCard]}
            />
          )}
          {history.playerA && history.playerA.length > 0 && (
            <CardRender key={playerA} name={playerA} cards={history.playerA} />
          )}
          {history.playerB && history.playerB.length > 0 && (
            <CardRender key={playerB} name={playerB} cards={history.playerB} />
          )}
          {history.playerC && history.playerC.length > 0 && (
            <CardRender key={playerC} name={playerC} cards={history.playerC} />
          )}
          {history.winner && (
            <CardRender
              key={"Winner"}
              name={"Winner"}
              cards={history.winner}
              isCard={false}
            />
          )}
        </div>

        <div className={style.cancelIcon}>
          <SetIcon
            icon={cancelIcon}
            onClick={(e) => {
              e.stopPropagation();
              toggleDetails();
            }}
          />
        </div>
      </div>
    </div>
  );
};
