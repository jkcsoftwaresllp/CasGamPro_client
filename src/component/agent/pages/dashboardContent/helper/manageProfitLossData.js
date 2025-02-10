import { useState, useEffect } from "react";

// Custom hook for managing profit and loss data
export const manageProfitLossData = (searchQuery = "") => {
  const [profitLoss, setProfitLoss] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfitLossData = async () => {
      setLoading(true);
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const mockData = [
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
          {
            date: "11-12-2024",
            roundId: "256554",
            roundTitle: "Lucky 7B",
            roundEarning: 4200,
            commissionEarning: 200,
            totalEarning: 5000,
          },
        ];
        setProfitLoss(mockData);
        setLoading(false);
      }); // Simulate a delay
    };

    fetchProfitLossData();
  }, []);

  const data = profitLoss.filter((item) =>
    item.roundTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
