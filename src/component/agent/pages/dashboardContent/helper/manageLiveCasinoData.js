import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

// Custom hook for managing live casino data
export const manageLiveCasinoData = (searchQuery = "") => {
  const [liveGames, setLiveGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiCall(
        "/auth-api/agent/liveCasinoReports",
        "GET"
      );
      if (response && response.uniqueCode === "CGP0081") {
        setLiveGames(response.data.data);
        setLoading(false);
      } else console.error("API Error:", response.data);
    };

    fetchData();
  }, []);

  const data =
    liveGames.length === 0
      ? []
      : liveGames.filter((game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return { loading, data };
};
