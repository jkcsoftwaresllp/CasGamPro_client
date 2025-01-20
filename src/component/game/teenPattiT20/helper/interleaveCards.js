// Helper function to interleave cards alternately between playerA and playerB
export const interleaveCards = (cards) => {
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

/*
Example cards input:
cards = {
  jokerCard: "S3",
  blindCard: null,
  playerA: ["S5", "H7"],
  playerB: ["D8", "C9"]
};

Output (interleaved cards array):
["S5", "D8", "H7", "C9"]
*/
