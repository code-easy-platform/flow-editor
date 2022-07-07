import React, { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { IObservable, observe, selector, useObserver, useObserverValue } from "react-observing";

import { TId } from "../types";


interface IBoardSizes {
  width: IObservable<number>;
  height: IObservable<number>;
}

export interface INodeRenderProps {
  width: IObservable<number>;
  height: IObservable<number>;
}
export interface INodeConnection {
  relatedId: IObservable<TId>;
  inputSlot: IObservable<number>;
  outputSlot: IObservable<number>;
}
export interface INode {
  id: IObservable<TId>;
  top: IObservable<number>;
  left: IObservable<number>;
  width: IObservable<number>;
  height: IObservable<number>;
  connections: IObservable<INodeConnection[]>;
  render: (props: INodeRenderProps) => ReactNode;
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
  boardSizes: IBoardSizes;
  flowStore: IObservable<INode[]>;
  linesStore: IObservable<ILine[]>;
  selectedItems: IObservable<TId[]>;
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

  const boardSizes = useMemo<IBoardSizes>(() => ({
    width: selector({
      get: ({ get }) => {
        return get(flow).reduce((previous, current) => {
          const left = get(current.left) + get(current.width);
          if (left > previous) return left;

          return previous;
        }, 0);
      }
    }),
    height: selector({
      get: ({ get }) => {
        return get(flow).reduce((previous, current) => {
          const top = get(current.top) + get(current.height);
          if (top > previous) return top;

          return previous;
        }, 0);
      }
    }),
  }), [flow]);

  const selectedItems = useMemo(() => observe([] as TId[]), []);


  return (
    <ItemsContext.Provider value={{ flowStore: flow, linesStore: lines, boardSizes, selectedItems }}>
      {children}
    </ItemsContext.Provider>
  );
}

export const useItemsContext = () => useContext(ItemsContext);

export const useBoardSizes = () => useItemsContext().boardSizes;

export const useSelectedItems = () => {
  const { selectedItems } = useItemsContext()

  return selectedItems;
};

export const useIsSelectedItem = (id: TId) => {
  const selectedItems = useObserverValue(useItemsContext().selectedItems);

  return useMemo(() => {
    return selectedItems.some(itemId => itemId === id);
  }, [selectedItems, id]);
};

export const useAddSelectedItem = () => {
  const [selectedItems, setSelectedItems] = useObserver(useItemsContext().selectedItems);

  return useCallback((id: TId, keepSelected = false) => {
    if (selectedItems.some(itemId => itemId === id)) {
      setSelectedItems(old => old.filter(itemId => itemId !== id));
    } else if (keepSelected) {
      setSelectedItems(old => [...old, id]);
    } else {
      setSelectedItems([id]);
    }
  }, [selectedItems]);
};
