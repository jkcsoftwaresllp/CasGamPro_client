import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

export const games = (searchQuery = "") => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const response = await apiCall("/auth-api/agent/games/types", "GET");
      if (response && response.uniqueCode === "CGP0051") {
        console.log("API Response:", response.data);
        setGames(response.data);
        setLoading(false);
      } else console.error("API Error:", response.data);
    };

    fetchGames();
  }, []);

  const data = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
