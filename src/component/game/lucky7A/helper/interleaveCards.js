// Helper function to interleave cards alternately between playerA and playerB
export const interleaveCards = (cards) => {
  const { playerA, playerB } = cards;
  console.log(cards);
  const finalCard = [...playerA, ...playerB];
  const sendableCard = finalCard.length > 0 ? finalCard[0] : null;
  console.log(sendableCard);
  return sendableCard;
};
