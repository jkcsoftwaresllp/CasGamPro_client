import { useState, useEffect } from "react";

export const manageCommissionData = (searchQuery = "") => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      setLoading(true);
      try {
        const response = await fetch("/auth-api/agent/commissionLimits", "GET");
        if (!response.ok) {
          throw new Error("Failed to fetch commission data");
        }
        const data = await response.json();
        setCommissions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  const data = commissions.filter((commission) =>
    commission.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
