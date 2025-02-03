import { useState, useEffect } from "react";

// Helper hook for managing loading state and fetching data
export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData([
          { label: "MY USERNAME", value: "SA85799" },
          { label: "MY NAME", value: "John Doe" },
          { label: "MY LEVEL", value: "SUPER AGENT" },
          { label: "MY FIX LIMIT", value: "18.00" },
          { label: "Company Contact", value: "SST54431" },
          { label: "Maximum My Share", value: "15.0%" },
          { label: "Minimum Company Share", value: "85%" },
          { label: "Match Commission", value: "3" },
          { label: "Session Commission", value: "3" },
        ]);
        setLoading(false);
      }); // Simulate a 2-second delay for data fetching
    };

    fetchData();
  }, []);

  return { loading, data };
};
