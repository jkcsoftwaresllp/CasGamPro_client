export const fetchDeck = async (setDeckId, drawBlindCard) => {
  try {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();
    setDeckId(data.deck_id);

    setTimeout(() => drawBlindCard(data.deck_id), 1000);
  } catch (error) {
    console.error("Error fetching deck:", error);
  }
};
