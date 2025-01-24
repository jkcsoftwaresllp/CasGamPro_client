import react, { useState } from "react";
import { Table } from "../../../common/table/jsx/Table.jsx";

export const PlayHistory = () => {
  const [lists, setLists] = useState([
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
    {
      gameName: "AndarBahar",
      roundId: "RoundId",
      stakeAmount: "400",
      result: "win",
    },
  ]);

  const columns = [
    { key: "gameName", label: "Game Name" },
    { key: "roundId", label: "Round ID" },
    { key: "stakeAmount", label: "Stake Amount" },
    { key: "result", label: "Result" },
  ];

  return <Table data={lists} columns={columns} />;
};
