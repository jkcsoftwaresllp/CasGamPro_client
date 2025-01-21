import React, { useEffect, useState } from "react";
import style from "../style/Wallet.module.css";
import { coinIcon } from "../../../assets/assets";
import { apiCall } from "../../common/apiCall";

export const Wallet = () => {
  const [walletPoints, setWalletPoints] = useState(0); // State for wallet points
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchWalletPoints = async () => {
      try {
        const response = await apiCall("/auth-api/client/user/wallet", "GET");
        if (response?.data?.walletPoints !== undefined) {
          setWalletPoints(response.data.walletPoints); // Set wallet points
        } else {
          setError("Error");
        }
      } catch (err) {
        setError("Error");
        console.error(err);
      }
    };

    fetchWalletPoints();
  }, []);

  return (
    <div className={style.wallet}>
      <div className={style.coin}>{coinIcon}</div>
      <p className={style.points}>{error ? error : walletPoints}</p>
    </div>
  );
};
