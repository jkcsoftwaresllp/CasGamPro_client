import { useState, useEffect } from "react";
import { apiCall } from "../manageClient/helper/apiCall";

// Custom hook for fetching and filtering client data
export const blockedClientsData = (searchQuery = "") => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchClients = async () => {
  //     setLoading(true);

  //     setTimeout(() => {
  //       const mockClients = [
  //         {
  //           id: 85800,
  //           username: "SP85800 (Ankur)",
  //           matchCommission: 0,
  //           sessionCommission: 0,
  //           share: 15,
  //         },

  //       ];
  //       setClients(mockClients);
  //       setLoading(false);
  //     }, 1000); // Simulating a 1-second delay
  //   };

  //   fetchClients();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall("/auth-api/agent/blocked", "GET");
        console.log("Blocked Client API Response: ", response);
        if (
          response &&
          (response.uniqueCode === "CGP0071" ||
            response.uniqueCode === "CGP0070")
        ) {
          setClients(response.data);
        } else {
          console.error("Blocked Client API Error:", response);
        }
      } catch (error) {
        console.error("Blocked Client Fetch Error:", error);
      } finally {
        setLoading(false); // Ensures loading is set to false in all cases
      }
    };

    fetchData();
  }, []);

  const data = clients.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
