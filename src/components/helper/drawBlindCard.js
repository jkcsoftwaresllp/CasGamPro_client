export const drawBlindCard = async (deckId, setBlindCard, drawJokerCard) => {
  try {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    setBlindCard(data.cards[0]);

    setTimeout(() => drawJokerCard(deckId), 10000); // Draw joker after 10 seconds
  } catch (error) {
    console.error("Error drawing blind card:", error);
  }
};
