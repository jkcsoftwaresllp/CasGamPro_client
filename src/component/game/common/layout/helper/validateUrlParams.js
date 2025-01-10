// Valid game names (example)
const validGames = ["lucky7B", "andarBahar", "teenPattiT20"];

// Validate URL parameters
export const validateUrlParams = (gameName, roundId) => {
  if (!validGames.includes(gameName)) {
    return "Invalid game name!";
  }

  const roundIdRegex = /^[a-zA-Z0-9]+$/;
  if (!roundIdRegex.test(roundId)) {
    return "Invalid round ID!";
  }

  return null; // No error
};
