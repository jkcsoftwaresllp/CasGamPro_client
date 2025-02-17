import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

// Custom hook for fetching and filtering client data
export const manageClientsData = (searchQuery = "") => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall("/auth-api/agent/players", "GET");
        if (response && response.uniqueCode === "CGP0038") {
          setClients(response.data);
          console.log("API Response: ", response.data);
        } else {
          console.error("API Error:", response.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false); // Ensures loading is set to false in all cases
      }
    };

    fetchData();
  }, []);

  const data = clients.filter((client) =>
    `${client.firstName} ${client.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
