import { Table } from "../../../../common/table/jsx/Table";

import { useAuth } from "../../../../../context/jsx/AuthContext";
import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../../../game/helper/socketService";
import { useEffect, useState } from "react";
import { useGameState } from "../../layout/helper/GameStateContext";

export const UserBetMain = () => {
  const [stakes, setStakes] = useState([]);
  const [error, setError] = useState(null);

  const namespace = "stake";

  const {
    user: { userId },
  } = useAuth();

  const { roundId } = useGameState();

  useEffect(() => {
    const socket = connectSocket(namespace);
    if (!userId || !namespace || !roundId) return;

    console.log({ userId, roundId });

    emitEvent(namespace, "joinStake", { userId, roundId });
    /* socket.on("connect", () => {
      emitEvent(namespace, "joinStake", { userId, roundId });
    }); */

    // Listen for existing stakes
    subscribeToEvent(namespace, "existingStakes", (data) => {
      console.log("Received existing stakes:", data);
      if (Array.isArray(data)) {
        setStakes(data);
      }
    });

    subscribeToEvent(namespace, "stakeUpdate", (data) => {
      console.log("Triggerd!!", data);
      if (data) {
        setStakes((prev) => [...prev, data]);
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
      disconnectSocket(namespace);
    };
  }, [userId, namespace, roundId]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "odd", label: "ODD" },
    { key: "stake", label: "Stake" },
    { key: "profit", label: "P/L" },
  ];

  return (
    <>
      <Table data={stakes} columns={columns} />
    </>
  );
};
