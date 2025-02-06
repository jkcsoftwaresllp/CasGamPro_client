import React from "react";
import { PaymentClear } from "./jsx/PaymentClear";
import { PaymentPaid } from "./jsx/PaymentPaid";
import { PaymentRecieve } from "./jsx/PaymentRecieve";
import style from "../styles/CollectionReport.module.css";

export const CollectionReport = () => {
  return (
    <div className={style.collectionReport}>
      {/* Row with first two components */}
      <div className={style.row}>
        <div className={style.element}>
          <PaymentRecieve />
        </div>
        <div className={style.element}>
          <PaymentPaid />
        </div>
      </div>

      {/* Row with the third component */}
      <div className={style.row}>
        <div className={style.element}>
          <PaymentClear />
        </div>
      </div>
    </div>
  );
};
