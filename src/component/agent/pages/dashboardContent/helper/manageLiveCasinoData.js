import { useState, useEffect } from "react";

// Custom hook for managing live casino data
export const manageLiveCasinoData = (searchQuery = "") => {
  const [liveGames, setLiveGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveCasinoData = async () => {
      setLoading(true);
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const mockData = [
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
        ];
        setLiveGames(mockData);
        setLoading(false);
      }); // Simulate a delay
    };

    fetchLiveCasinoData();
  }, []);

  const data = liveGames.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
