import { Table } from "../../../../common/table/jsx/Table";

export const UserBetMain = () => {
  const lists = [
    { name: "A", odd: "1.5", stake: "100", profit: "150" },
    { name: "B", odd: "2.0", stake: "200", profit: "400" },
    { name: "C", odd: "1.8", stake: "150", profit: "270" },
    { name: "A", odd: "1.5", stake: "500", profit: "130" },
    { name: "B", odd: "2.0", stake: "200", profit: "400" },
    { name: "A", odd: "1.5", stake: "100", profit: "150" },
    { name: "B", odd: "2.0", stake: "200", profit: "400" },
    { name: "C", odd: "1.8", stake: "150", profit: "270" },
    { name: "C", odd: "1.8", stake: "150", profit: "270" },
    { name: "C", odd: "1.8", stake: "150", profit: "270" },
    { name: "A", odd: "1.5", stake: "500", profit: "130" },
    { name: "B", odd: "2.0", stake: "200", profit: "400" },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "odd", label: "ODD" },
    { key: "stake", label: "Stake" },
    { key: "profit", label: "P/L" },
  ];

  return (
    <>
      <Table data={lists} columns={columns} />
    </>
  );
};
