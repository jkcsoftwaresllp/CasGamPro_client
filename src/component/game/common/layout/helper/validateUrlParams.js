import { validGames } from "../../../helper/gameTypes";

// Validate URL parameters
export const validateUrlParams = (gameName) => {
  if (!validGames.includes(gameName)) {
    return "Invalid game name!";
  }

  return null; // No error
};
