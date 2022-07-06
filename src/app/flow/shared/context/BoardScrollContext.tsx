import React, { createContext, useContext, useMemo } from "react";
import { observe } from "react-observing";


const BoardScrollContext = createContext({
  top: observe(0),
  left: observe(0),
});

export const BoardScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scroll = useMemo(() => ({
    top: observe(0),
    left: observe(0),
  }), []);

  return (
    <BoardScrollContext.Provider value={scroll}>
      {children}
    </BoardScrollContext.Provider>
  );
}

export const useBoardScrollContext = () => useContext(BoardScrollContext);
