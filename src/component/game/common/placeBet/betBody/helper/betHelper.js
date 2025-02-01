// betHelper.js
import { apiCall } from "../../../../../common/apiCall";

export const handleSubmit = async ({
  stakeValue,
  currentProfit,
  player,
  gameType,
  roundId,
  setBetItems,
}) => {
  try {
    const response = await apiCall("/auth-api/client/games/place-bet", "POST", {
      gameId: roundId,
      side: player,
      roundId,
      amount: stakeValue,
    });
    console.log(response);
    // if (uniqueCode === "CGP00G05") {
    //   console.log("Stake submitted successfully");
    // } else {
    //   console.error(`Error submitting stake: ${message}`);
    // }
  } catch (error) {
    console.error("Error during stake submission:", error.message);
  } finally {
    setBetItems(null);
  }
};
