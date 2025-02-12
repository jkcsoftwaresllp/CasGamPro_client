import React, { useEffect, useState } from "react";
import style from "../style/Wallet.module.css";
import { coinIcon } from "../../../assets/assets";
// import { apiCall } from "../../common/apiCall";

import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../game/helper/socketService";
import { useAuth } from "../../../context/jsx/AuthContext";

export const Wallet = () => {
  const [walletPoints, setWalletPoints] = useState(0); // State for wallet points
  const [error, setError] = useState(null); // State for error handling

  const {
    user: { userId },
  } = useAuth();

  // useEffect(() => {
  //   const fetchWalletPoints = async () => {
  //     try {
  //       const response = await apiCall("/auth-api/client/user/wallet", "GET");
  //       if (response?.data?.walletPoints !== undefined) {
  //         setWalletPoints(response.data.walletPoints); // Set wallet points
  //       } else {
  //         setError("Error");
  //       }
  //     } catch (err) {
  //       setError("Error");
  //       console.error(err);
  //     }
  //   };

  //   fetchWalletPoints();
  // }, []);

  const namespace = "wallet";
  const socket = connectSocket(namespace);

  useEffect(() => {
    socket.on("connect", () => {
      emitEvent(namespace, "joinWallet", userId);
    });

    console.log(userId);
    subscribeToEvent(namespace, "walletUpdate", (walletUpdate) => {
      if (walletUpdate) {
        setWalletPoints(walletUpdate.balance);
      }
    });

    socket.on("connect_error", (error) => {
      setError("Connection Error");
      console.error("Connection error:", error);
    });

    socket.on("error", (error) => {
      setError("Socket Error");

      console.error("Socket error:", error);
    });

    // Cleanup on component unmount
    return () => {
      disconnectSocket();
    };
  }, [userId, socket]);

  return (
    <div className={style.wallet}>
      <div className={style.coin}>{coinIcon}</div>
      <p className={style.points}>{error ? error : walletPoints}</p>
    </div>
  );
};
