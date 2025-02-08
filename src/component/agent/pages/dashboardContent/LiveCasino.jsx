import React, { useState } from "react";

import style from "../styles/ManageClient.module.css";
import { LiveCasinoTable } from "./table/LiveCasinoTable";

export const LiveCasino = () => {
  const [games] = useState([
    {
      title: "Teen Patti Round_1524856",
      date: "11-12-2024",
      declare: "Yes",
      profitLoss: "+5920",
    },
    {
      title: "Teen Patti Round_1524856",
      date: "11-12-2024",
      declare: "Yes",
      profitLoss: "+5920",
    },
    {
      title: "Teen Patti Round_1524856",
      date: "11-12-2024",
      declare: "Yes",
      profitLoss: "+5920",
    },
    {
      title: "Teen Patti Round_1524856",
      date: "11-12-2024",
      declare: "Yes",
      profitLoss: "+5920",
    },
    {
      title: "Teen Patti Round_1524856",
      date: "11-12-2024",
      declare: "Yes",
      profitLoss: "+5920",
    },
  ]);

  return (
    <div className={style.manageClientsContainer}>
      {/* Client Table */}
      <div className={style.tableContainer}>
        <LiveCasinoTable games={games} />
      </div>
    </div>
  );
};
