// Helper function to interleave cards alternately between playerA and playerB
export const interleaveCards = (cards) => {
  const playerACards = [...(cards.playerA || [])];
  const playerBCards = [...(cards.playerB || [])];
  const interleavedCards = [playerACards[0]];

  return interleavedCards;
};
