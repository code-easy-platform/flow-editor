import React, { createContext, useContext, useMemo } from "react";
import { IObservable, observe } from "react-observing";

import { TId } from '../types';


interface IDragLineContextData {
  nodeId: TId;
  lineId: TId;
  type: 'start' | 'end';
  top: IObservable<number>;
  left: IObservable<number>;
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
