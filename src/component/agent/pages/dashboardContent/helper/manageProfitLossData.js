import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

// Custom hook for managing profit and loss data
export const manageProfitLossData = (searchQuery = "") => {
  const [profitLoss, setProfitLoss] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProfitLossData = async () => {
  //     setLoading(true);
  //     // Simulating an API call with setTimeout
  //     setTimeout(() => {
  //       const mockData = [
  //         {
  //           date: "11-12-2024",
  //           roundId: "256554",
  //           roundTitle: "Lucky 7B",
  //           roundEarning: 4200,
  //           commissionEarning: 200,
  //           totalEarning: 5000,
  //         },
  //       ];
  //       setProfitLoss(mockData);
  //       setLoading(false);
  //     }); // Simulate a delay
  //   };

  //   fetchProfitLossData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiCall("/auth-api/agent/profit-loss", "GET");
      console.log(response);
      if (
        response &&
        (response.uniqueCode === "CGP0094" || response.uniqueCode === "CGP0095")
      ) {
        setProfitLoss(response.data);
      } else console.error("API Error:", response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const data = profitLoss.filter((item) =>
    item.roundTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
