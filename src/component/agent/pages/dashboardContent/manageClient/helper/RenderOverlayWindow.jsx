import { useEffect, useState, useMemo } from "react";
import { TableOverWindow } from "../../TableOverWindow";
import { apiCall } from "../../../../../common/apiCall";
import { roles } from "../../../../../../utils/roles";

const RESPONSE_CODES = ["CGP0169", "CGP0177", "CGP0173", "CGP0005"];

const COLUMN_CONFIGS = {
  userLedger: {
    columns: [
      { key: "date", label: "Date" },
      { key: "entry", label: "Entry" },
      { key: "debit", label: "Debit" },
      { key: "credit", label: "Credit" },
      { key: "balance", label: "Balance" },
    ],
    columnWidths: { entry: 2 },
    title: "Ledger Table",
  },
  cashLedger: {
    columns: [
      { key: "date", label: "Date" },
      { key: "via", label: "Via" },
      { key: "liya", label: "Liya" },
      { key: "diya", label: "Diya" },
      { key: "remainingBalance", label: "Remaining Balance" },
    ],
    columnWidths: { via: 2 },
    title: "Cash Table",
  },
  userStatementLedger: {
    columns: [
      { key: "date", label: "Date" },
      { key: "description", label: "Description" },
      { key: "credit", label: "Credit" },
      { key: "debit", label: "Debit" },
      { key: "balance", label: "Balance" },
    ],
    columnWidths: { description: 2 },
    title: "Statement Table",
  },
  userChilds: {
    columns: [
      { key: "id", label: "Client ID" },
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "casinoCommission", label: "Casino Commission" },
      { key: "lotteryCommission", label: "Lottery Commission" },
      { key: "matchShare", label: "Share" },
      { key: "currentLimit", label: "Current Limit" },
    ],
    columnWidths: { firstName: 0.5, lastName: 0.5 },
  },
};

const getTableConfig = (userRole, isClicked, clieckedId, setClieckedId) => ({
  ...COLUMN_CONFIGS,
  userChilds: {
    ...COLUMN_CONFIGS.userChilds,
    clickableColumns: userRole === roles.ADMIN && !isClicked ? ["id"] : [],
    onCellClick: async (value, setData, setIsClicked) => {
      const response = await apiCall(`/auth-api/panel/childs/${value}`, "GET");
      if (response && RESPONSE_CODES.includes(response.uniqueCode)) {
        setData(response.data.results);
        setIsClicked(true);
        setClieckedId(value);
      } else {
        console.error("API Error:", response.data);
      }
    },
    title:
      userRole === roles.ADMIN && !isClicked
        ? `Agents of ${clieckedId}`
        : `Clients of ${clieckedId}`,
  },
});
export const RenderOverlayWindow = ({
  setIsOverlayView,
  tableName,
  id,
  userRole,
}) => {
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [clieckedId, setClieckedId] = useState(id);

  const items = useMemo(
    () => getTableConfig(userRole, isClicked, clieckedId, setClieckedId),
    [userRole, isClicked]
  );

  useEffect(() => {
    const fetchLiveCasinoData = async () => {
      try {
        const endpoint =
          tableName === "userChilds"
            ? `/auth-api/panel/childs/${id}`
            : `/auth-api/panel/${tableName}/${id}`;

        const response = await apiCall(endpoint, "GET");
        if (response && RESPONSE_CODES.includes(response.uniqueCode)) {
          setData(response.data.results);
        } else {
          console.error("API Error:", response.data);
        }
      } catch (error) {
        console.error("API Request Failed:", error);
      }
    };

    fetchLiveCasinoData();
  }, [tableName, id]);

  return (
    <TableOverWindow
      data={data}
      columns={items[tableName]?.columns || []}
      columnWidths={items[tableName]?.columnWidths || {}}
      setIsOverlayView={setIsOverlayView}
      clickableColumns={items[tableName]?.clickableColumns || []}
      onCellClick={
        items[tableName]?.onCellClick
          ? (value) =>
              items[tableName].onCellClick(value, setData, setIsClicked)
          : () => {}
      }
      title={items[tableName].title}
    />
  );
};
