import React, { createContext, ReactNode, useCallback, useContext, useMemo, useRef } from "react";
import { IObservable, observe, selector, set, useObserver, useObserverValue } from "react-observing";

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
  selectedItems: IObservable<INode[]>;
  selectedItemsId: IObservable<TId[]>;
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

  const selectedItemsId = useMemo(() => observe([] as TId[]), []);

  const selectedItems = useMemo(() => {
    return selector({
      get: ({ get }) => {
        const selectedItems = get(flow).filter(node => get(selectedItemsId).includes(get(node.id)))
        return selectedItems;
      }
    });
  }, [selectedItemsId]);


  return (
    <ItemsContext.Provider value={{ flowStore: flow, linesStore: lines, boardSizes, selectedItems, selectedItemsId }}>
      {children}
    </ItemsContext.Provider>
  );
}

export const useItemsContext = () => useContext(ItemsContext);

export const useBoardSizes = () => useItemsContext().boardSizes;

export const useSelectedItemsId = () => {
  const { selectedItemsId: selectedItems } = useItemsContext()

  return selectedItems;
};

export const useIsSelectedItemById = (id: TId) => {
  const selectedItems = useObserverValue(useItemsContext().selectedItemsId);

  return useMemo(() => {
    return selectedItems.some(itemId => itemId === id);
  }, [selectedItems, id]);
};

export const useToggleSelectedItem = () => {
  const [selectedItems, setSelectedItems] = useObserver(useItemsContext().selectedItemsId);

  return useCallback((id: TId, keepSelected = false) => {
    if (selectedItems.some(itemId => itemId === id) && !keepSelected) return;

    if (selectedItems.some(itemId => itemId === id)) {
      setSelectedItems(old => old.filter(itemId => itemId !== id));
    } else if (keepSelected) {
      setSelectedItems(old => [...old, id]);
    } else {
      setSelectedItems([id]);
    }
  }, [selectedItems]);
};

export const useDragSelectedItems = () => {
  const { selectedItems } = useItemsContext();

  return useCallback((movementX: number, movementY: number) => {
    if (selectedItems.value.length === 0) return;

    if (selectedItems.value.every(node => node.top.value > 0) || movementY > 0) {
      selectedItems.value.forEach(node => {
        set(node.top, old => (old + movementY) <= 0 ? 0 : (old + movementY));
      });
    }
    if (selectedItems.value.every(node => node.left.value > 0) || movementX > 0) {
      selectedItems.value.forEach(node => {
        set(node.left, old => (old + movementX) <= 0 ? 0 : (old + movementX));
      });
    }
  }, [selectedItems]);
};
