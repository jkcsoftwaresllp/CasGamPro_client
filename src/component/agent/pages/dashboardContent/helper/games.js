import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

export const games = (searchQuery = "") => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const response = await apiCall("/auth-api/agent/games/types", "GET");
      console.log("API Response:", response);
      if (response && response.uniqueCode === "CGP0109") {
        setGames(response.data);
      } else console.error("API Error:", response);
      setLoading(false);
    };

    fetchGames();
  }, []);

  const data = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
