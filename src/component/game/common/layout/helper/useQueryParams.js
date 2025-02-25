import { useLocation } from "react-router-dom";
import { validateUrlParams } from "../helper/validateUrlParams";
import { useEffect, useState } from "react";

export const useQueryParams = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [gameType, setGameType] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const gameName = queryParams.get("gameName");

    if (gameName) {
      const errorMessage = validateUrlParams(gameName);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setGameType(gameName);
        setError(null); // Reset error state
      }
    } else {
      setError("Missing gameName or roundId in URL");
    }
  }, [location.search]);

  return { gameType, error };
};
