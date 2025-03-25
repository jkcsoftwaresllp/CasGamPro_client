import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./style/AgentManageUser.module.css";
import { Loader } from "../../../../common/Loader";
import { Button } from "../../../../common/Button";
import { DashboardCard } from "../jsx/DashboardCard";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient";
import { apiCall } from "../../../../common/apiCall";
import { RenderOverlayWindow } from "./helper/RenderOverlayWindow";
import { getManageClients } from "../../../../panels/helper/sidebarConfig";
import { useAuth } from "../../../../../context/jsx/AuthContext";
import { roles } from "../../../../../utils/roles";
import { rolePathData } from "../../../../panels/dashboard/AgentDashboard";

const getChildsLabel = (role) => {
  const temp = {
    [roles.ADMIN]: `View Agents `,
    [roles.SUPERAGENT]: `View Clients`,
  };
  return temp[role];
};

const rolesToOpen = [roles.ADMIN, roles.SUPERAGENT];

export const AgentManageUser = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [exposure, setExposure] = useState("");
  const [coins, setCoins] = useState("");
  const [isOverlayView, setIsOverlayView] = useState(false);
  const [tableName, setTableName] = useState("");
  const { user } = useAuth();
  const userRole = user.userRole;

  const basePath = rolePathData[userRole];

  useEffect(() => {
    setTimeout(() => setLoading(false), 100); // Simulating data fetch
  }, []);

  useEffect(() => {
    const fetchExposure = async () => {
      const response = await apiCall(
        `/auth-api/panel/user-exposure/${id}`,
        "GET"
      );
      console.log("API call for Exposure", response);

      if (response && response.uniqueCode === "CGP0153") {
        setExposure(response.data.balance);
        setCoins(response.data.coins);
      }
    };
    fetchExposure();
  }, []);

  const heading = getManageClients(userRole);

  const RenderButtons = () => {
    return (
      <div className={style.infoBody}>
        <h2 className={style.heading}>
          {heading} : {id}
        </h2>
        <div className={style.buttonGrid}>
          <Button
            label="Receive Cash"
            onClick={() =>
              navigate(
                `${basePath}${path.manageClients}${path.recieveCash.replace(
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
                `${basePath}${path.manageClients}${path.payCash.replace(
                  ":id",
                  id
                )}`
              )
            }
          />
          <Button
            label="Ledger"
            onClick={() => {
              setIsOverlayView(true);
              setTableName("userLedger");
            }}
          />
          <Button
            label="Cash Ledger"
            onClick={() => {
              setIsOverlayView(true);
              setTableName("cashLedger");
            }}
          />

          <Button
            label="Statements"
            onClick={() => {
              setIsOverlayView(true);
              setTableName("userStatementLedger");
            }}
          />

          {rolesToOpen.includes(userRole) && (
            <Button
              label={getChildsLabel(userRole)}
              onClick={() => {
                setIsOverlayView(true);
                setTableName("userChilds");
              }}
            />
          )}
        </div>

        {/* TODO : Correct this  */}
        <div className={style.cardGrid}>
          <DashboardCard label="Coins" value={coins} />
          <DashboardCard label="Rs Exposure" value={exposure} />
        </div>
      </div>
    );
  };

  return (
    <div className={style.container}>
      {loading ? (
        <Loader />
      ) : isOverlayView ? (
        <RenderOverlayWindow
          setIsOverlayView={setIsOverlayView}
          tableName={tableName}
          id={id}
          userRole={userRole}
        />
      ) : (
        <RenderButtons />
      )}
    </div>
  );
};
