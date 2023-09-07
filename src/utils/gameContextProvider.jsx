import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
    const [isGameOver, setIsGameOver] = useState(false);
  
    const gameContextValue = {
      isGameOver,
      setIsGameOver,
    };
  
    return (
      <GameContext.Provider value={gameContextValue}>
        {children}
      </GameContext.Provider>
    );
  };
