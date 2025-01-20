import { useLocation } from "react-router-dom";
import { validateUrlParams } from "../helper/validateUrlParams";
import { useEffect, useState } from "react";

export const useQueryParams = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [gameType, setGameType] = useState(null);
  const [roundId, setRoundId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const gameName = queryParams.get("gameName");
    const roundId = queryParams.get("roundId");

    if (gameName && roundId) {
      const errorMessage = validateUrlParams(gameName, roundId);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setGameType(gameName);
        setRoundId(roundId);
        setError(null); // Reset error state
      }
    } else {
      setError("Missing gameName or roundId in URL");
    }
  }, [location.search]);

  return { gameType, roundId, error };
};
