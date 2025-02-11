import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

// Custom hook for fetching and filtering client data
export const manageClientsData = (searchQuery = "") => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiCall("/auth-api/agent/players", "GET");
      if (response && response.uniqueCode === "CGP0038") {
        setClients(response.data.clients);
        console.log("API Response: ", response.data.clients);
        setLoading(false);
      } else console.error("API Error:", response.data);
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
