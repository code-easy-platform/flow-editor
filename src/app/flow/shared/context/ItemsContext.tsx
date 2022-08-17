import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IObservable, observe, selector, set } from "react-observing";

import { TId } from "../types";


interface IBoardSizes {
  width: IObservable<number>;
  height: IObservable<number>;
}

export interface INodeRenderProps {
  isSelected: boolean;
  width: IObservable<number>;
  height: IObservable<number>;
}
export interface INodeSlot {
  id: IObservable<TId>;
  ordem: IObservable<number>;
}
export interface INodeConnection {
  id: IObservable<TId>;
  relatedId: IObservable<TId>;
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
  key: string;
  id: IObservable<TId>;
  nodeId: IObservable<TId>;
  top1: IObservable<number>;
  top2: IObservable<number>;
  left1: IObservable<number>;
  left2: IObservable<number>;
  width1: IObservable<number>;
  width2: IObservable<number>;
  height2: IObservable<number>;
  height1: IObservable<number>;
  relatedNodeId: IObservable<TId>;
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
        .forEach((node, _, allNodes) => {

          get(node.connections)
            .forEach(connection => {
              const relatedNode = allNodes.find(node => get(connection.relatedId) === get(node.id))

              if (!relatedNode) return;

              lines.push({
                top1: node.top,
                left1: node.left,
                top2: relatedNode.top,
                left2: relatedNode.left,

                width1: node.width,
                height1: node.height,
                width2: relatedNode.width,
                height2: relatedNode.height,

                nodeId: node.id,
                id: connection.id,
                relatedNodeId: relatedNode.id,

                key: `line_key_${get(node.id)}_${get(relatedNode.id)}`,
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
  const { selectedItemsId } = useItemsContext();

  const [isSelected, setIsSelected] = useState(selectedItemsId.value.includes(id));

  useEffect(() => {
    const subscription = selectedItemsId.subscribe(ids => {
      const isSelected = ids.includes(id);
      setIsSelected(old => old !== isSelected ? isSelected : old);
    });

    return () => subscription.unsubscribe();
  }, [selectedItemsId, id]);


  return isSelected;
};

export const useToggleSelectedItem = () => {
  const { selectedItemsId, linesStore } = useItemsContext();

  return useCallback((id: TId | TId[], keepSelected = false) => {
    if (typeof id === 'string') {
      if (selectedItemsId.value.some(itemId => itemId === id) && !keepSelected) return;

      if (selectedItemsId.value.some(itemId => itemId === id)) {
        set(selectedItemsId, old => {
          const result = old
            .filter(itemId => itemId !== id)
            .filter(id => !linesStore.value.some(line => line.id.value === id));

          const linesId = linesStore.value
            .filter(line => result.includes(line.nodeId.value) && result.includes(line.relatedNodeId.value))
            .map(line => line.id.value);

          return [...result, ...linesId];
        });
      } else if (keepSelected) {
        set(selectedItemsId, old => {
          const result = [
            ...old.filter(id => !linesStore.value.some(line => line.id.value === id)),
            id,
          ];

          const linesId = linesStore.value
            .filter(line => result.includes(line.nodeId.value) && result.includes(line.relatedNodeId.value))
            .map(line => line.id.value);

          return [...result, ...linesId];
        });
      } else {
        set(selectedItemsId, [id]);
      }
    } else {
      const result = [...id];

      const linesId = linesStore.value
        .filter(line => result.includes(line.nodeId.value) && result.includes(line.relatedNodeId.value))
        .map(line => line.id.value);

      set(selectedItemsId, [...result, ...linesId]);
    }
  }, [selectedItemsId]);
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
