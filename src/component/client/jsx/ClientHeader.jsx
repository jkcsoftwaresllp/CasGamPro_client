import React, { useEffect, useState, useContext } from "react";
import { HeaderBtnGroup } from "../../../layoutDash/jsx/HeaderBtnGroup";
import style from "../style/ClientHeader.module.css";
import { fetchWalletPoints } from "../helper/walletPoints"; // Import helper
import { Heart } from "./heart";
import { useAuth } from "../../../context/jsx/AuthContext";

export const ClientHeader = () => {
  const [walletPoints, setWalletPoints] = useState(1000); // Dummy wallet points
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch userId and userName from UserContext
  const userId = user.userId;
  const userName = user.userName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Commenting out the API call for now
        // const data = await fetchWalletPoints();
        // setWalletPoints(data.walletPoints);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className={style.error}>Error: {error}</div>;
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.flexContainer}>
       {/* TODO : Wallel Point */}
        <HeaderBtnGroup />
        <Heart />
      </div>
    </div>
  );
};
