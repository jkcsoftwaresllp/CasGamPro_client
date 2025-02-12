import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

// Custom hook for managing transaction data
export const manageInOut = (searchQuery = "") => {
  const [InOut, setInOut] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchInOut = async () => {
  //     setLoading(true);
  //     // Simulating an API call with setTimeout
  //     setTimeout(() => {
  //       const mockData = [
  //         {
  //           date: "11-12-2024",
  //           description:
  //             "Limit Decreased of Ankur(SP85800) by Monu(SA85799) - Done By -SA85799",
  //           aya: 5230,
  //           gya: 0,
  //           commPosative: 0,
  //           commNegative: 0,
  //           limit: 20,
  //         },

  //       ];
  //       setInOut(mockData);
  //       setLoading(false);
  //     }); // Simulate a delay
  //   };

  //   fetchInOut();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiCall("/auth-api/agent/ledger", "GET");
      console.log("Inout Data:", response);
      if (response && response.uniqueCode === "CGP0088") {
        setInOut(response.data);
      } else console.error("API Error:", response);
      setLoading(false);
    };

    fetchData();
  }, []);

  const data = InOut.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
