import React, { useEffect, useState, useContext } from "react";
import { UserInfo } from "../../../layoutDash/jsx/UserInfo";
import { HeaderBtnGroup } from "../../../layoutDash/jsx/HeaderBtnGroup";
import style from "../style/ClientHeader.module.css";
import { fetchWalletPoints } from "../helper/walletPoints"; // Import helper
import { UserContext } from "../../../context/userContext/UserContext"; // Adjust the path as needed

export const ClientHeader = () => {
  const [walletPoints, setWalletPoints] = useState(1000); // Dummy wallet points
  const [error, setError] = useState(null);

  // Fetch userId and userName from UserContext
  const { user } = useContext(UserContext);
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
      {/* Pass props to UserInfo */}
      <UserInfo
        userId={userId}
        userName={userName}
        walletPoints={walletPoints}
      />
      <HeaderBtnGroup />
    </div>
  );
};
