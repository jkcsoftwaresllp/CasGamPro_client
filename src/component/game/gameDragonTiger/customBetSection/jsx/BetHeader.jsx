import React from "react";
import {BetHeaderRight} from "./BetHeaderRight";
import {BetHeaderLeft} from "./BetHeaderLeft";

import style from "../style/BetHeader.module.css";

export const BetHeader = () => {
  return (
    <div className={style.BetHeader}>
      <BetHeaderRight />
      <BetHeaderLeft />
    </div>
  );
};

