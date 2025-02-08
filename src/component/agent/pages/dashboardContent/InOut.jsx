import React, { useState } from "react";
import style from "../styles/ManageClient.module.css";
import { InOutTable } from "./table/InOutTable";

export const InOut = () => {
  const [data] = useState([
    {
      date: "11-12-2024",
      description:
        "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
      aya: 5230,
      gya: 0,
      commPosative: 0,
      commNegative: 0,
      limit: 20,
    },
    {
      date: "11-12-2024",
      description:
        "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
      aya: 5230,
      gya: 0,
      commPosative: 0,
      commNegative: 0,
      limit: 20,
    },
    {
      date: "11-12-2024",
      description:
        "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
      aya: 5230,
      gya: 0,
      commPosative: 0,
      commNegative: 0,
      limit: 20,
    },
    {
      date: "11-12-2024",
      description:
        "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
      aya: 5230,
      gya: 0,
      commPosative: 0,
      commNegative: 0,
      limit: 20,
    },
    {
      date: "11-12-2024",
      description:
        "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
      aya: 5230,
      gya: 0,
      commPosative: 0,
      commNegative: 0,
      limit: 20,
    },
    {
      date: "11-12-2024",
      description:
        "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
      aya: 5230,
      gya: 0,
      commPosative: 0,
      commNegative: 0,
      limit: 20,
    },
  ]);

  return (
    <div className={style.manageClientsContainer}>
      {/* Client Table */}
      <div className={style.tableContainer}>
        <InOutTable data={data} />
      </div>
    </div>
  );
};
