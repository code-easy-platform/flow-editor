import React, { createContext, useContext } from "react";
import { INode } from '../../context';


interface IDraggableContainerContextData {
  node: INode;
}
const DraggableContainerContext = createContext({} as IDraggableContainerContextData);

export const DraggableContainerProvider = ({ children, node }: React.PropsWithChildren<IDraggableContainerContextData>) => {
  return (
    <DraggableContainerContext.Provider value={{ node }}>
      {children}
    </DraggableContainerContext.Provider>
  );
}

export const useDraggableContainerContext = () => useContext(DraggableContainerContext);
