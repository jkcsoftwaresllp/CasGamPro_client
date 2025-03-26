// Helper function to interleave cards alternately between playerA and playerB
export const interleaveCards = (cards) => {
  const { playerA, playerB } = cards;
  // console.log(cards);
  const finalCard = [...playerA, ...playerB];
  // console.log(finalCard);
  return finalCard;
};
