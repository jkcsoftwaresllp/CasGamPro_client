import React, { createContext, useReducer, useContext } from "react";

// Define initial state
const initialState = {
  gameType: null,
  gameId: null,
  status: null,
  cards: {
    jokerCard: null,
    blindCard: null,
    playerA: [],
    playerB: [],
    playerC: [],
  },
  winner: null,
  startTime: null,
};

// Define action types
const actionTypes = {
  UPDATE_GAME_STATE: "UPDATE_GAME_STATE",
  RESET_GAME_STATE: "RESET_GAME_STATE",
};

// Reducer function to manage state updates
const gameReducer = (state, action) => {

  switch (action.type) {
    case actionTypes.UPDATE_GAME_STATE:
      return {
        ...state,
        ...action.payload,
        cards: {
          ...state.cards,
          ...action.payload.cards, // Ensuring nested updates don't overwrite entire structure
        },
      };
    case actionTypes.RESET_GAME_STATE:
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create context
const GameStateContext = createContext();
const GameDispatchContext = createContext();

// Provider component
export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

// Custom hooks for accessing state and dispatch
export const useGameState = () => useContext(GameStateContext); // When values need to be used
export const useGameDispatch = () => useContext(GameDispatchContext); // When values need to be set
