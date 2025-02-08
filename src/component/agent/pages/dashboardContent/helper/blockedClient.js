import { useState, useEffect } from "react";

// Custom hook for fetching and filtering client data
export const blockedClientsData = (searchQuery = "") => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      // Simulating an API call with a setTimeout
      setTimeout(() => {
        const mockClients = [
          {
            id: 85800,
            username: "SP85800 (Ankur)",
            matchCommission: 0,
            sessionCommission: 0,
            share: 15,
          },
          {
            id: 85801,
            username: "SP85801 (Rahul)",
            matchCommission: 2,
            sessionCommission: 1,
            share: 20,
          },
          {
            id: 85800,
            username: "SP85800 (Ankur)",
            matchCommission: 0,
            sessionCommission: 0,
            share: 15,
          },
          {
            id: 85801,
            username: "SP85801 (Rahul)",
            matchCommission: 2,
            sessionCommission: 1,
            share: 20,
          },
          {
            id: 85802,
            username: "SP85802 (Priya)",
            matchCommission: 1.5,
            sessionCommission: 0.5,
            share: 18,
          },
          {
            id: 85803,
            username: "SP85803 (Vikram)",
            matchCommission: 0,
            sessionCommission: 2,
            share: 22,
          },
          {
            id: 85800,
            username: "SP85800 (Ankur)",
            matchCommission: 0,
            sessionCommission: 0,
            share: 15,
          },
          {
            id: 85801,
            username: "SP85801 (Rahul)",
            matchCommission: 2,
            sessionCommission: 1,
            share: 20,
          },
          {
            id: 85802,
            username: "SP85802 (Priya)",
            matchCommission: 1.5,
            sessionCommission: 0.5,
            share: 18,
          },
          {
            id: 85803,
            username: "SP85803 (Vikram)",
            matchCommission: 0,
            sessionCommission: 2,
            share: 22,
          },
        ];
        setClients(mockClients);
        setLoading(false);
      }, 1000); // Simulating a 1-second delay
    };

    fetchClients();
  }, []);

  const data = clients.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
