import React from "react";
import BetHeaderRight from "./BetHeaderRight";
import BetHeaderLeft from "./BetHeaderLeft";

import style from "../style/BetHeader.module.css";

const BetHeader = () => {
  return (
    <div className={style.BetHeader}>
      <BetHeaderRight />
      <BetHeaderLeft />
    </div>
  );
};

export default BetHeader;
