import React from "react";
import { Table } from "../../../common/table/jsx/Table";

export const UserList = () => {
  const list = [
    {
      id: "A415",
      username: "Mohd Salman",
      casinoCommission: "3",
      lotteryCommission: "3",
      matchShare: "9",
    },
    {
      id: "A415",
      username: "Mohd Salman",
      casinoCommission: "3",
      lotteryCommission: "3",
      matchShare: "9",
    },
    {
      id: "A415",
      username: "Mohd Salman",
      casinoCommission: "3",
      lotteryCommission: "3",
      matchShare: "9",
    },
    {
      id: "A415",
      username: "Mohd Salman",
      casinoCommission: "3",
      lotteryCommission: "3",
      matchShare: "9",
    },
    {
      id: "A415",
      username: "Mohd Salman",
      casinoCommission: "3",
      lotteryCommission: "3",
      matchShare: "9",
    },
    {
      id: "A415",
      username: "Mohd Salman",
      casinoCommission: "3",
      lotteryCommission: "3",
      matchShare: "9",
    },
    {
      id: "A415",
      username: "Mohd Salman",
      casinoCommission: "3",
      lotteryCommission: "3",
      matchShare: "9",
    },
  ];

  const columns = [
    { key: "id", label: "User Id" },
    { key: "username", label: "User Name" },
    { key: "casinoCommission", label: "Casino Commission" },
    { key: "lotteryCommission", label: "Lottery Commission" },
    { key: "matchShare", label: "Match Share" },
  ];
  return <Table data={list} columns={columns} />;
};
