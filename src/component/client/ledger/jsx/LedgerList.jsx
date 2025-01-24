import { useEffect, useState } from "react"; // Import necessary hooks
import { LedgerRow } from "./LedgerRow";
import style from "../style/Ledger.module.css";
import { ScrollBox } from "../../../../component/game/common/layout/jsx/ScrollBox";
import { fetchLedgerData } from "../helper/ledger";

export const LedgerList = () => {
  const [lists, setLists] = useState([]); // State to hold the fetched data

  useEffect(() => {
    const getData = async () => {
      const data = await fetchLedgerData();
      setLists(data);
    };

    getData();
  }, []);
  return (
    <div className={style.window}>
      <ScrollBox>
        {lists.map((list, index) => (
          <LedgerRow
            key={index}
            date={list.date}
            entry={list.entry}
            debit={list.debit}
            credit={list.credit}
            balance={list.balance}
          />
        ))}
      </ScrollBox>
    </div>
  );
};
