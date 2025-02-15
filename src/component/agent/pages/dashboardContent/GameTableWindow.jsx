import React, { useEffect, useState } from "react";
import style from "../styles/GametableWindow.module.css";
import { BlockGameTable } from "./table/BlockGameTable";
import { IconBtn } from "../../../common/IconBtn";
import { closeIcon } from "../../../../assets/assets";
import { apiCall } from "./manageClient/helper/apiCall";

export const GameTableWindow = ({ gameName, setIsGameView }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchLiveCasinoData = async () => {
      const response = await apiCall(
        `/auth-api/agent/games/${gameName}`,
        "GET"
      );
      console.log("API Response:", response);
      if (response && response.uniqueCode === "CGP0080") {
        setGames(response.data);
      } else console.error("API Error:", response.data);
    };

    fetchLiveCasinoData();
  }, []);

  return (
    <div className={style.gameTableWindowWrapper}>
      <div className={style.close}>
        <IconBtn icon={closeIcon} onClick={() => setIsGameView(false)} />
      </div>
      <div className={style.gameTableWindow}>
        <BlockGameTable games={games} />
      </div>
    </div>
  );
};
