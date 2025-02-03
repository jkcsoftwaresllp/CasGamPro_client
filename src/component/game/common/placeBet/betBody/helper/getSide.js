export const getSide = (value, gameType) => {
  const betSides = {
    lucky7B: ["low", "high", "mid", "odd", "even", "black", "red"],
    teenPatti: ["playerA", "playerB"],

    AndarBahar2: [
      "andar",
      "aahar", // Base sides
    ],
    dragonTiger: [
      "dragon",
      "tiger",
      "tie",
      "pair",
      "odd",
      "even",
      "black",
      "red",
      "DA",
      "D2",
      "D3",
      "D4",
      "D5",
      "D6",
      "D7",
      "D8",
      "D9",
      "D10",
      "DJ",
      "DQ",
      "DK",
      "TA",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "TJ",
      "TQ",
      "TK",
    ],

    AndarBahar: [
      "AA",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "AJ",
      "AQ",
      "AK",
      "BA",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B10",
      "BJ",
      "BQ",
      "BK",
    ],
  };

  // **Handle AndarBahar2 Special Case**
  if (gameType === "AndarBahar2") {
    const match = value.match(/^(Andar|Bahar)\s*(\d+)?$/i);
    if (match) return match[1]; // Extracts only "Andar" or "Bahar"
  }

  // **Handle DragonTiger Special Case**
  if (gameType === "dragonTiger") {
    const match = value.match(/^(D|T)\s*(\d+)?$/i);
    if (match) return match[1] === "D" ? "dragon" : "tiger";
  }

  // **Standard Handling for Other Game Types**
  const lowerValue = value.toLowerCase();
  const validSides = betSides[gameType];

  if (validSides && validSides.includes(lowerValue)) {
    return lowerValue;
  }

  return null; // Return null for invalid values
};
