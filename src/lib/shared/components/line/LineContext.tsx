import React, { createContext, useContext } from "react";
import { IObservable } from 'react-observing';

import { IHandle, INode } from '../../context';
import { TId } from '../../types';


interface ILineContextContextData {
  /** Undefined for line add */
  lineId: IObservable<TId | undefined>;

  /** Node where the connection is fond */
  nodeId: IObservable<TId>;
  nodeStart: INode;
  nodeStartHandle: IHandle;

  /** Node where the connection will target */
  relatedNodeId: IObservable<TId>;
  nodeEnd: INode;
  nodeEndHandle: IHandle;
}
const LineContextContext = createContext({} as ILineContextContextData);

export const LineContextProvider = ({ children, ...rest }: React.PropsWithChildren<ILineContextContextData>) => {
  return (
    <LineContextContext.Provider value={rest}>
      {children}
    </LineContextContext.Provider>
  );
}

export const useLineContextContext = () => useContext(LineContextContext);
