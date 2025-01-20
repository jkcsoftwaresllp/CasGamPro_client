// Helper function to interleave cards alternately between playerA and playerB
export const interleaveCards = (cards) => {

  if (!cards.jokerCard) return null;

  console.log(cards);

  const playerACards = [...(cards.playerA || [])];
  const playerBCards = [...(cards.playerB || [])];

  const interleavedCardSet = [];

  // Interleave cards from playerA and playerB
  while (playerACards.length || playerBCards.length) {
    if (playerACards.length) {
      interleavedCardSet.push(playerACards.shift()); // Add card for Player A
    }
    if (playerBCards.length) {
      interleavedCardSet.push(playerBCards.shift()); // Add card for Player B
    }
  }
  
  return interleavedCardSet;
};
