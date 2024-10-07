import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { IObservable, observe, selector, set } from "react-observing";

import { TId } from "../types";


interface IBoardSizes {
  width: IObservable<number>;
  height: IObservable<number>;
}

export interface INodeRenderProps {
  width: IObservable<number>;
  height: IObservable<number>;
  isSelected: IObservable<boolean>;
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
  disableDropConnections?: () => boolean;
  disableCreateConnections?: () => boolean;
  connections: IObservable<INodeConnection[]>;
  render: (props: INodeRenderProps) => ReactNode;
}

export interface ILine {
  key: string;
  id: IObservable<TId>;
  /** Node where the connection is fond */
  nodeId: IObservable<TId>;
  nodeStart: {
    top: IObservable<number>;
    left: IObservable<number>;
    width: IObservable<number>;
    height: IObservable<number>;
  };
  nodeEnd: {
    top: IObservable<number>;
    left: IObservable<number>;
    width: IObservable<number>;
    height: IObservable<number>;
  };
  isCurved: IObservable<boolean>;
  /** Node where the connection will target */
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

  const flowRef = useRef(observe(items));
  useEffect(() => {
    flowRef.current.value = items;
  }, [items]);


  const lines = useMemo(() => selector<ILine[]>({
    get: ({ get }) => {
      const lines: ILine[] = [];

      get(flowRef.current)
        .forEach((node, _, allNodes) => {

          get(node.connections)
            .forEach(connection => {
              const relatedNode = allNodes.find(node => get(connection.relatedId) === get(node.id))

              if (!relatedNode) return;

              lines.push({
                nodeStart: {
                  top: node.top,
                  left: node.left,
                  width: node.width,
                  height: node.height,
                },
                nodeEnd: {
                  top: relatedNode.top,
                  left: relatedNode.left,
                  width: relatedNode.width,
                  height: relatedNode.height,
                },

                nodeId: node.id,
                id: connection.id,
                relatedNodeId: relatedNode.id,

                key: `line_key_${get(node.id)}_${get(relatedNode.id)}`,

                isCurved: selector(({ get }) => {
                  return get(relatedNode.connections).some(connection => get(connection.relatedId) === get(node.id));
                }),
              });
            });
        });

      return lines;
    }
  }), []);

  const boardSizes = useMemo<IBoardSizes>(() => ({
    width: selector({
      get: ({ get }) => {
        return get(flowRef.current).reduce((previous, current) => {
          const left = get(current.left) + get(current.width);
          if (left > previous) return left;

          return previous;
        }, 0);
      }
    }),
    height: selector({
      get: ({ get }) => {
        return get(flowRef.current).reduce((previous, current) => {
          const top = get(current.top) + get(current.height);
          if (top > previous) return top;

          return previous;
        }, 0);
      }
    }),
  }), []);

  const selectedItemsId = useMemo(() => observe([] as TId[]), []);

  const selectedItems = useMemo(() => {
    return selector({
      get: ({ get }) => {
        const selectedItems = get(flowRef.current).filter(node => get(selectedItemsId).includes(get(node.id)))
        return selectedItems;
      }
    });
  }, [selectedItemsId]);


  return (
    <ItemsContext.Provider value={{ flowStore: flowRef.current, linesStore: lines, boardSizes, selectedItems, selectedItemsId }}>
      {children}
    </ItemsContext.Provider>
  );
}

export const useItemsContext = () => useContext(ItemsContext);

export const useBoardSizes = () => useItemsContext().boardSizes;

export const useSelectedItemsId = () => {
  const { selectedItemsId } = useItemsContext()
  return selectedItemsId;
};

export const useIsSelectedItemById = (id: TId) => {
  const { selectedItemsId } = useItemsContext();

  const isSelectedObservable = useRef(observe(selectedItemsId.value.includes(id)));


  useEffect(() => {
    const subscription = selectedItemsId.subscribe(ids => {
      const isSelected = ids.includes(id);
      set(isSelectedObservable.current, old => old !== isSelected ? isSelected : old);
    });

    return () => subscription.unsubscribe();
  }, [selectedItemsId, id]);


  return isSelectedObservable.current;
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
      if (id.sort().join() === selectedItemsId.value.sort().join()) return;

      const result = [...id];

      const linesId = linesStore.value
        .filter(line => result.includes(line.nodeId.value) && result.includes(line.relatedNodeId.value))
        .map(line => line.id.value);


      if ([...result, ...linesId].sort().join() === selectedItemsId.value.sort().join()) return;

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
