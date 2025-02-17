import react, { useEffect, useState } from "react";
import { Table } from "../../../common/table/jsx/Table.jsx";
import { getPlayData } from "../helper/getPlayData.js";
import { apiCall } from "../../../common/apiCall.js";

export const PlayHistory = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const response = await apiCall("/auth-api/client/playHistory", "GET");
      console.log("Play History Data:", response);
      if (response && response.uniqueCode === "CGP0115") {
        setLists(response.data);
        // setLoading(false);
      } else console.error("API Error:", response);
    };

    fetchData();
  }, []);

  const columns = [
    { key: "gameName", label: "Game Name" },
    { key: "roundId", label: "Round ID" },
    { key: "stakeAmount", label: "Stake Amount" },
    { key: "result", label: "Result" },
  ];

  return <Table data={lists} columns={columns} />;
};
