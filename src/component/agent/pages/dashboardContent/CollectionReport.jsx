import React, { useEffect, useState } from "react";
import { PaymentClear } from "./jsx/PaymentClear";
import { PaymentPaid } from "./jsx/PaymentPaid";
import { PaymentRecieve } from "./jsx/PaymentRecieve";
import style from "../styles/CollectionReport.module.css";
import { apiCall } from "../../../common/apiCall";

export const CollectionReport = () => {
  const [paymentReceivingFrom, setPaymentReceivingFrom] = useState([]);
  const [paymentPaidTo, setPaymentPaidTo] = useState([]);
  const [paymentCleared, setPaymentCleared] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiCall(
        "/auth-api/agent/collection-report",
        "GET"
      );
      console.log("Collection Report Data:", response);
      if (
        response &&
        (response.uniqueCode === "CGP0075" || response.uniqueCode === "CGP0074")
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
          <PaymentRecieve data={paymentReceivingFrom} />
        </div>
        <div className={style.element}>
          <PaymentPaid data={paymentPaidTo} />
        </div>
      </div>

      {/* Row with the third component */}
      <div className={style.row}>
        <div className={style.element}>
          <PaymentClear data={paymentCleared} />
        </div>
      </div>
    </div>
  );
};
