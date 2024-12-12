import React, { useState, useEffect } from 'react';

export const Simulation = () => {
  const [playerACards, setPlayerACards] = useState([]);
  const [playerBCards, setPlayerBCards] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [deckId, setDeckId] = useState(null);
  const [timer, setTimer] = useState(30); // Timer countdown (in seconds)

  useEffect(() => {
    // Initialize the deck
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then((response) => response.json())
      .then((data) => {
        setDeckId(data.deck_id);
      });
  }, []);

  useEffect(() => {
    if (!deckId) return;

    // Start countdown timer
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsDrawing(true);
          drawCards();
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(countdown);
  }, [deckId]);

  const drawCards = () => {
    let cardIndex = 0;
    let tempPlayerACards = [];
    let tempPlayerBCards = [];

    const interval = setInterval(() => {
      if (cardIndex < 6) {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
          .then((response) => response.json())
          .then((data) => {
            const card = data.cards[0];
            const cardDetails = {
              rank: card.value,
              suit: card.suit,
              value: getCardValue(card.value),
              image: card.image,
            };

            if (cardIndex % 2 === 0) {
              tempPlayerACards.push(cardDetails);
              setPlayerACards([...tempPlayerACards]);
            } else {
              tempPlayerBCards.push(cardDetails);
              setPlayerBCards([...tempPlayerBCards]);
            }

            if (cardIndex === 5) {
              clearInterval(interval);
              determineWinner(tempPlayerACards, tempPlayerBCards);
            }

            cardIndex++;
          });
      }
    }, 1000); // Draw a card every second
  };

  const getCardValue = (rank) => {
    const rankValues = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    };
    return rankValues[rank];
  };

  const determineWinner = (playerACards, playerBCards) => {
    const handRank = (cards) => {
      const values = cards.map((card) => card.value).sort((a, b) => a - b);
  
      const isSequence =
        values[2] - values[1] === 1 && values[1] - values[0] === 1;
      const isSet = values[0] === values[1] && values[1] === values[2];
  
      if (isSet) return { rank: 3, highCard: values[2], tiebreakers: values };
      if (isSequence) return { rank: 2, highCard: values[2], tiebreakers: values };
      return { rank: 1, highCard: Math.max(...values), tiebreakers: values.reverse() };
    };
  
    const compareHands = (handA, handB) => {
      if (handA.rank > handB.rank) {
        return 'Player A Wins!';
      } else if (handB.rank > handA.rank) {
        return 'Player B Wins!';
      } else {
        // Same rank, compare high cards using tiebreakers
        for (let i = 0; i < handA.tiebreakers.length; i++) {
          if (handA.tiebreakers[i] > handB.tiebreakers[i]) return 'Player A Wins!';
          if (handB.tiebreakers[i] > handA.tiebreakers[i]) return 'Player B Wins!';
        }
        return "It's a Tie!";
      }
    };
  
    const playerAHand = handRank(playerACards);
    const playerBHand = handRank(playerBCards);
    const result = compareHands(playerAHand, playerBHand);
  
    setWinner(result);
  };
  
  const getCardStyle = (player) => {
    if (!winner) return {};
    if ((winner.includes('Player A') && player === 'A') || (winner.includes('Player B') && player === 'B')) {
      return {border: '2px solid green', backgroundColor: 'green', color: 'white' };
    }
    return { border: '2px solid red',backgroundColor: 'red', color: 'white' };
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#dfffe0',
      }}
    >
      {!isDrawing ? (
        <h5 style={{ fontWeight: 'bold' }}>
          Game starts in: {timer} second{timer > 1 ? 's' : ''}...
        </h5>
      ) : (
        <h5 style={{ fontWeight: 'bold' }}>Cards are being drawn...</h5>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h6 style={{ fontWeight: 'bold' }}>Player A:           {playerACards.map((card, index) => (
            <div
              key={index}
              style={{
                display: 'inline-block',
                margin: '5px',
                fontSize: '18px',
                borderRadius: '5px',
                textAlign: 'center',
                ...getCardStyle('A'),
              }}
            >
              <img
                src={card.image}
                alt={`${card.rank} of ${card.suit}`}
                style={{ width: '55px' }}
              />
            </div>
          ))}
        </h6>
        <div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h6 style={{ fontWeight: 'bold' }}>Player B:           {playerBCards.map((card, index) => (
            <div
              key={index}
              style={{
                display: 'inline-block',
                margin: '5px',
                fontSize: '18px',
                borderRadius: '5px',
                textAlign: 'center',
                ...getCardStyle('B'),
              }}
            >
              <img
                src={card.image}
                alt={`${card.rank} of ${card.suit}`}
                style={{ width: '55px' }}
              />
            </div>
          ))}
        </h6>
        <div>
        </div>
      </div>

      {winner && (
        <div
          style={{
            marginTop: '30px',
            fontSize: '28px',
            fontWeight: 'bold',
            color: winner.includes('Wins') ? 'green' : 'red',
          }}
        >
          {winner}
        </div>
      )}
    </div>
  );
};
