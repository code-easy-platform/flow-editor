import React, { createContext, useContext, useMemo } from "react";
import { IObservable, observe } from "react-observing";


interface IBoardScrollData {
  top: IObservable<number>;
  left: IObservable<number>;
}
const BoardScrollContext = createContext({} as IBoardScrollData);

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
