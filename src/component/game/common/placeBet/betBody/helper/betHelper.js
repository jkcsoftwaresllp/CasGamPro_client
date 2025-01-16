export const handleStakeChange = (setStakeValue) => (value) => {
  setStakeValue((prev) => prev + value);
};

export const handleReset =
  (setStakeValue, setCurrentProfit, initialStake, initialProfit) => () => {
    setStakeValue(initialStake);
    setCurrentProfit(initialProfit);
  };

export const handleSubmit = (stakeValue, currentProfit, setBetItems) => () => {
  console.log(
    `Stake submitted: ${stakeValue}, Profit: ${currentProfit.toFixed(2)}`
  );
  setBetItems(null);
};
