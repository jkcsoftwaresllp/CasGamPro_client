import React, { useEffect, useState } from "react";

import style from "../styles/CollectionReport.module.css";
import { apiCall } from "../../../common/apiCall";
import { PaymentTable } from "./jsx/PaymentTable";

export const CollectionReport = () => {
  const [paymentReceivingFrom, setPaymentReceivingFrom] = useState([]);
  const [paymentPaidTo, setPaymentPaidTo] = useState([]);
  const [paymentCleared, setPaymentCleared] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiCall(
        "/auth-api/panel/collection-report",
        "GET"
      );
      console.log("Collection Report Data:", response);
      if (
        response &&
        (response.uniqueCode === "CGP0075" || response.uniqueCode === "CGP0073")
      ) {
        setPaymentReceivingFrom(response.data.paymentReceivingFrom);
        setPaymentPaidTo(response.data.paymentPaidTo);
        setPaymentCleared(response.data.paymentCleared);
        setLoading(false);
      } else console.error("API Error:", response);
    };

    fetchData();
  }, []);

  return (
    <div className={style.collectionReport}>
      {/* Row with first two components */}
      <div className={style.row}>
        <div className={style.element}>
          <PaymentTable
            data={paymentReceivingFrom}
            title={"Payment Receiving From (Lena Hai)"}
          />
        </div>
        <div className={style.element}>
          <PaymentTable
            data={paymentPaidTo}
            title={"Payment Paid To (Dena Hai)"}
          />
        </div>
      </div>

      {/* Row with the third component */}
      <div className={style.row}>
        <div className={style.element}>
          <PaymentTable
            data={paymentCleared}
            title={"Payment Clear (Clear Hai)"}
          />
        </div>
      </div>
    </div>
  );
};
