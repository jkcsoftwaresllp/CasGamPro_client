export const getPlayerNames = (gameId) => {
  const gamePlayerMapping = {
    AB2: ["Andar", "Bahar", null],
    AB1: ["Andar", "Bahar", null],
    L7B: ["Low", "High", "Mid"],
    L7A: ["Low", "High", "Mid"],
    TP1: ["Player A", "Player B", null],
    DT20: ["Dragon", "Tiger", "Tie/Pair"],
    DT20TWO: ["Dragon", "Tiger", "Tie/Pair"],
    DTL20: ["Dragon", "Tiger", "Lion"],
  };

  return gamePlayerMapping[gameId] || [];
};
