import React, { useEffect, useState } from "react";
import { BlockGameTable } from "./table/BlockGameTable";

import { apiCall } from "./manageClient/helper/apiCall";

export const GameTableWindow = ({ gameName, setIsOverlayView }) => {
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

  return <BlockGameTable games={games} setIsOverlayView={setIsOverlayView} />;
};
