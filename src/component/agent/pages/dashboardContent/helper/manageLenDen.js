import { useState, useEffect } from "react";

export const manageLenDen = (searchQuery = "") => {
  const [LenDen, setLenDen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLenDen = async () => {
      setLoading(true);
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const mockData = [
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569", // Last 3 digits of roundId
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569", // Last 3 digits of roundId
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569", // Last 3 digits of roundId
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
          {
            agentId: "12345",
            entry: "Casino - Teen Patti 569",
            betsAmount: 50000,
            profitAmount: 10000,
            lossAmount: 5000,
            agentProfitShare: {
              credit: 10000,
              debit: 5000,
            },
            agentCommission: 2000,
            balance: 7000,
            note: "Settlement for round 1001",
          },
        ];
        setLenDen(mockData);
        setLoading(false);
      }); // Simulate a delay
    };

    fetchLenDen();
  }, []);

  const data = LenDen.filter((item) =>
    item.entry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { loading, data };
};
