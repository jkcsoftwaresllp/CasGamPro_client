export const handleStakeChange = (setStakeValue) => (value) => {
  setStakeValue((prev) => prev + value);
};

export const handleProfitChange = (setCurrentProfit) => (newProfit) => {
  setCurrentProfit(newProfit);
};

export const handleReset =
  (setStakeValue, setCurrentProfit, initialStake, initialProfit) => () => {
    setStakeValue(initialStake);
    setCurrentProfit(initialProfit);
  };

export const handleSubmit = (stakeValue, currentProfit) => () => {
  console.log(
    `Stake submitted: ${stakeValue}, Profit: ${currentProfit.toFixed(2)}`
  );
};
