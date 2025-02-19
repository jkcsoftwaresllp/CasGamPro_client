import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./style/AgentManageUser.module.css";
import { Loader } from "../../../../common/Loader";
import { Button } from "../../../../common/Button";
import { DashboardCard } from "../jsx/DashboardCard";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient";

export const AgentManageUser = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 100); // Simulating data fetch
  }, []);

  return (
    <div className={style.container}>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.infoBody}>
          <h2 className={style.heading}>Manage User {id}</h2>
          <div className={style.buttonGrid}>
            <Button
              label="Receive Cash"
              onClick={() =>
                navigate(
                  `${path.agent}${path.manageClients}${path.recieveCash.replace(
                    ":id",
                    id
                  )}`
                )
              }
            />
            <Button
              label="Pay Cash"
              onClick={() =>
                navigate(
                  `${path.agent}${path.manageClients}${path.payCash.replace(
                    ":id",
                    id
                  )}`
                )
              }
            />
            <Button
              label="Ledger"
              onClick={() =>
                navigate(
                  `${path.agent}${path.manageClients}${path.ledger.replace(
                    ":id",
                    id
                  )}`
                )
              }
            />
            <Button
              label="Cash Ledger"
              onClick={() =>
                navigate(
                  `${path.agent}${path.manageClients}${path.cashledger.replace(
                    ":id",
                    id
                  )}`
                )
              }
            />
            <Button
              label="Match Ledger"
              onClick={() =>
                navigate(
                  `${path.agent}${path.manageClients}${path.matchledger.replace(
                    ":id",
                    id
                  )}`
                )
              }
            />
            <Button
              label="Coin History"
              onClick={() =>
                navigate(
                  `${path.agent}${path.manageClients}${path.coinhistory.replace(
                    ":id",
                    id
                  )}`
                )
              }
            />
            <Button
              label="Statements"
              onClick={() =>
                navigate(
                  `${path.agent}${path.manageClients}${path.statement.replace(
                    ":id",
                    id
                  )}`
                )
              }
            />
          </div>
          {/* TODO : Correct this  */}
          {/* <div className={style.cardGrid}>
            <DashboardCard label="Coins" value="-35000" />
            <DashboardCard label="Rs Exposure" value="5000" />
          </div> */}
        </div>
      )}
    </div>
  );
};
