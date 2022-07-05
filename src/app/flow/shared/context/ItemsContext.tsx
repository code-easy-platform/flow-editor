import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { IObservable, observe, selector } from "react-observing";

import { TId } from "../types";


export interface INodeConnection {
  relatedId: IObservable<TId>;
  inputSlot: IObservable<number>;
  outputSlot: IObservable<number>;
}
export interface INode {
  id: IObservable<TId>;
  render: () => ReactNode;
  top: IObservable<number>;
  left: IObservable<number>;
  width: IObservable<number>;
  height: IObservable<number>;
  connections: IObservable<INodeConnection[]>;
}

export interface ILine {
  id: TId;
  top1: IObservable<number>;
  top2: IObservable<number>;
  left1: IObservable<number>;
  left2: IObservable<number>;
  width1: IObservable<number>;
  width2: IObservable<number>;
  height2: IObservable<number>;
  height1: IObservable<number>;
  inputSlot: IObservable<number>;
  outputSlot: IObservable<number>;
}

interface IItemsContextData {
  flowStore: IObservable<INode[]>;
  linesStore: IObservable<ILine[]>;
}
const ItemsContext = createContext({} as IItemsContextData);

interface IItemsProviderProps {
  items: INode[];
  children: React.ReactNode;
}
export const ItemsProvider = ({ children, items }: IItemsProviderProps) => {
  const flow = useMemo(() => observe(items), [items]);

  const lines = useMemo(() => selector<ILine[]>({
    get: ({ get }) => {
      const lines: ILine[] = [];

      get(flow)
        .forEach((block, _, allBlocks) => {

          get(block.connections)
            .forEach(connection => {
              const relatedBlock = allBlocks.find(block => get(connection.relatedId) === get(block.id))

              if (!relatedBlock) return;

              lines.push({
                top1: block.top,
                left1: block.left,
                top2: relatedBlock.top,
                left2: relatedBlock.left,

                width1: block.width,
                height1: block.height,
                width2: relatedBlock.width,
                height2: relatedBlock.height,

                inputSlot: connection.inputSlot,
                outputSlot: connection.outputSlot,

                id: `${get(block.id)}-${get(relatedBlock.id)}`,
              });
            });
        });

      return lines;
    }
  }), [flow]);


  return (
    <ItemsContext.Provider value={{ flowStore: flow, linesStore: lines }}>
      {children}
    </ItemsContext.Provider>
  );
}

export const useItemsContext = () => useContext(ItemsContext);
