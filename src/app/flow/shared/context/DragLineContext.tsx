import React, { createContext, useContext, useMemo } from "react";
import { IObservable, observe } from "react-observing";

import { TId } from '../types';


interface IDragLineContextData {
  nodeId: TId;
  type: 'start' | 'end';
  lineId: TId | undefined;
}

const DragLineContext = createContext<IObservable<IDragLineContextData | undefined>>(observe(undefined));

export const DragLineProvider = ({ children }: { children: React.ReactNode }) => {
  const draggableLineData = useMemo(() => observe(undefined), []);

  return (
    <DragLineContext.Provider value={draggableLineData}>
      {children}
    </DragLineContext.Provider>
  );
}

export const useDragLineContext = () => useContext(DragLineContext);
