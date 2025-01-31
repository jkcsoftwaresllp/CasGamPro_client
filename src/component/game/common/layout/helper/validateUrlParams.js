// Valid game names (example)
const validGames = [
  "lucky7B",
  "andarBahar2",
  "andarBahar1",
  "teenPattiT20",
  "dragonTiger",
];

// Validate URL parameters
export const validateUrlParams = (gameName) => {
  if (!validGames.includes(gameName)) {
    return "Invalid game name!";
  }

  return null; // No error
};
