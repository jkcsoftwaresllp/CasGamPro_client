import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

export const manageCommissionData = (searchQuery = "") => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      setLoading(true);
      try {
        const response = await apiCall(
          "/auth-api/agent/commissionLimits",
          "GET"
        );
        console.log("API Response: ", response);
        if (response && response.uniqueCode === "CGP0051") {
          setCommissions(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch commission data");
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  const data = commissions;
  // .filter((commission) => {
  //   console.log("Commission: ", commission);
  //   return `${commission.clientName}`
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  // });

  return { loading, data };
};
