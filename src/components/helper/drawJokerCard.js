export const drawJokerCard = async (
  deckId,
  setJokerCard,
  dealCardsAutomatically
) => {
  try {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    setJokerCard(data.cards[0]);

    setTimeout(() => dealCardsAutomatically(deckId, data.cards[0]), 3000); // Start dealing cards after 3 seconds
  } catch (error) {
    console.error("Error drawing Joker card:", error);
  }
};
