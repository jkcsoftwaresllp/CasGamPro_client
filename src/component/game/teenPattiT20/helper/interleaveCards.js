// Helper function to interleave cards alternately between playerA and playerB
export const interleaveCards = (cards) => {
  const { playerA, playerB } = cards;

  const cardsToPresnt = [];

  // Interleave cards from playerA and playerB
  while (playerA.length || playerB.length) {
    if (playerA.length) {
      cardsToPresnt.push(playerA.shift()); // Add card for Player A
    }
    if (playerB.length) {
      cardsToPresnt.push(playerB.shift()); // Add card for Player B
    }
  }

  console.log(cardsToPresnt);
  return cardsToPresnt;
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
