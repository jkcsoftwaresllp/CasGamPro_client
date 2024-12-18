export const dealCardsAuto = async (
  deckId,
  joker,
  setAndarPile,
  setBaharPile,
  setWinner,
  setGameOver,
  setDeckVisible
) => {
  let andar = [];
  let bahar = [];
  let gameFinished = false;
  let isAndarTurn = true; // Track whose turn it is (Andar starts first)

  const interval = setInterval(async () => {
    if (gameFinished || !deckId) {
      clearInterval(interval);
      setGameOver(true); // Show the winner only after the interval ends
      setDeckVisible(false); // Hide the deck when the game ends
      return;
    }

    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await response.json();

      if (data.cards.length > 0) {
        const currentCard = data.cards[0];

        // Add the card to the respective pile
        if (isAndarTurn) {
          andar.push(currentCard);
          setAndarPile([...andar]);

          if (currentCard.value === joker.value) {
            setWinner("Andar");
            gameFinished = true;
          }
        } else {
          bahar.push(currentCard);
          setBaharPile([...bahar]);

          if (currentCard.value === joker.value && !gameFinished) {
            setWinner("Bahar");
            gameFinished = true;
          }
        }

        // Switch the turn to the other pile
        isAndarTurn = !isAndarTurn;
      } else {
        // If no cards are left in the deck
        clearInterval(interval);
        setGameOver(true);
        setDeckVisible(false);
      }
    } catch (error) {
      console.error("Error dealing cards:", error);
      clearInterval(interval);
    }
  }, 3000); // 3-second interval between each card placement
};
