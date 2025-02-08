import { useState, useEffect } from "react";

export const games = (searchQuery = "") => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const mockGames = [
          { id: 1, betfairid: "1.23", name: "Cricket", status: "Active" },
          { id: 2, betfairid: "1.24", name: "Football", status: "Active" },
          { id: 3, betfairid: "1.25", name: "Tennis", status: "Active" },
          { id: 4, betfairid: "1.26", name: "Basketball", status: "Active" },
          { id: 5, betfairid: "1.27", name: "Baseball", status: "Inactive" },
          { id: 6, betfairid: "1.28", name: "Hockey", status: "Active" },
          { id: 7, betfairid: "1.29", name: "Golf", status: "Inactive" },
          { id: 8, betfairid: "1.30", name: "Rugby", status: "Active" },
          { id: 9, betfairid: "1.31", name: "Boxing", status: "Active" },
          { id: 10, betfairid: "1.32", name: "MMA", status: "Inactive" },
          { id: 11, betfairid: "1.33", name: "Badminton", status: "Active" },
          { id: 12, betfairid: "1.34", name: "Table Tennis", status: "Active" },
          { id: 13, betfairid: "1.35", name: "Volleyball", status: "Active" },
          { id: 14, betfairid: "1.36", name: "Handball", status: "Inactive" },
          { id: 15, betfairid: "1.37", name: "Snooker", status: "Active" },
          { id: 16, betfairid: "1.38", name: "Darts", status: "Inactive" },
          { id: 17, betfairid: "1.39", name: "Cycling", status: "Active" },
          { id: 18, betfairid: "1.40", name: "Motorsports", status: "Active" },
          { id: 19, betfairid: "1.41", name: "Esports", status: "Active" },
          { id: 20, betfairid: "1.42", name: "Chess", status: "Inactive" },
        ];
        setGames(mockGames);
        setLoading(false);
      }, 1000); // Simulating network delay
    };

    fetchGames();
  }, []);

  const data = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
