import { useState, useEffect } from "react";

// Custom hook for fetching and filtering commission data
export const manageCommissionData = (searchQuery) => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      setLoading(true);
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const mockCommissions = [
          {
            id: 85800,
            username: "SP85800 (Ankur)",
            matchCommission: 0,
            sessionCommission: 0,
            currentLimit: 10000,
            showExpo: "View",
          },
          {
            id: 85801,
            username: "SP85801 (Rahul)",
            matchCommission: 2,
            sessionCommission: 1,
            currentLimit: 20000,
            showExpo: "View",
          },
          {
            id: 85802,
            username: "SP85802 (Priya)",
            matchCommission: 1.5,
            sessionCommission: 0.5,
            currentLimit: 15000,
            showExpo: "View",
          },
          {
            id: 85803,
            username: "SP85803 (Vikram)",
            matchCommission: 0,
            sessionCommission: 2,
            currentLimit: 25000,
            showExpo: "View",
          },
        ];
        setCommissions(mockCommissions);
        setLoading(false);
      }, 1000); // Simulate a delay
    };

    fetchCommissions();
  }, []);

  const filteredCommissions = commissions.filter((commission) =>
    commission.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, filteredCommissions };
};
