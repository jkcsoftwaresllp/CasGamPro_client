import { useState, useEffect } from "react";

// Custom hook for managing transaction data
export const manageInOut = (searchQuery = "") => {
  const [InOut, setInOut] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInOut = async () => {
      setLoading(true);
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const mockData = [
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
          {
            date: "11-12-2024",
            description:
              "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
            aya: 5230,
            gya: 0,
            commPosative: 0,
            commNegative: 0,
            limit: 20,
          },
        ];
        setInOut(mockData);
        setLoading(false);
      }); // Simulate a delay
    };

    fetchInOut();
  }, []);

  const data = InOut.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
