import React, { useState } from "react";
import style from "../styles/GameTableWindow.module.css";
import { BlockGameTable } from "./table/BlockGameTable";
import { IconBtn } from "../../../common/IconBtn";
import { closeIcon } from "../../../../assets/assets";

export const GameTableWindow = ({ gameName, setIsGameView }) => {
  const [games] = useState([
    {
      id: 1,
      betfairid: "1.23",
      name: "Cricket",
      status: "Active",
    },
    {
      id: 2,
      betfairid: "1.24",
      name: "Football",
      status: "Active",
    },
    {
      id: 3,
      betfairid: "1.25",
      name: "Tennis",
      status: "Active",
    },
  ]);

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
