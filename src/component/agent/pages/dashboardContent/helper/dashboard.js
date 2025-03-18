import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

// Helper hook for managing loading state and fetching data
export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCall("/auth-api/panel/dashboard", "GET");
      console.log(response);
      if (response.uniqueCode === "CGP0016") {
        setData(response.data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { loading, data };
};
