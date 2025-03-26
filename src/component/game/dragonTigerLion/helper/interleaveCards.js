// Helper function to interleave cards alternately between playerA and playerB
export const interleaveCards = (cards) => {
  const { playerA, playerB, playerC } = cards;
  // console.log(cards);
  const finalCard = [...playerA, ...playerB, ...playerC];
  // console.log(finalCard);
  return finalCard;
};
