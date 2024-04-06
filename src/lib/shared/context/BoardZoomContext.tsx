import React, { createContext, useContext, useMemo } from "react";
import { observe } from "react-observing";


const BoardZoomContext = createContext(observe(1));

export const BoardZoomProvider = ({ children, value }: { value: number, children: React.ReactNode }) => {
  const zoomObservable = useMemo(() => observe(value < 1 ? 1 : value), [value]);

  return (
    <BoardZoomContext.Provider value={zoomObservable}>
      {children}
    </BoardZoomContext.Provider>
  );
}

export const useBoardZoomContext = () => useContext(BoardZoomContext);
