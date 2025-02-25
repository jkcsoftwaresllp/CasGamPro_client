import React from "react";
import { GameStateProvider } from "../helper/GameStateContext";
import { Game } from "./Game";

export const GameRunner = () => {
  return (
    <GameStateProvider>
      <Game />
    </GameStateProvider>
  );
};
