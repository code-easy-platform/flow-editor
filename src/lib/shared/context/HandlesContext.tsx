import React, { createContext, useCallback, useContext, useMemo } from "react";
import { IObservable, observe, set } from "react-observing";

import { INode } from './ItemsContext';
import { TId } from '../types';


export interface IHandle {
  node: INode;

  /** Internal id */
  _id: IObservable<TId>;
  id: IObservable<TId | undefined>;

  top: IObservable<number>;
  left: IObservable<number>;
  width: IObservable<number>;
  height: IObservable<number>;

  position: IObservable<'left' | 'right' | 'top' | 'bottom'>;
}

interface IHandlesContextData {
  handles: IObservable<IHandle[]>;

  deleteById(id: TId): void;
  addOrUpdate(handle: IHandle): void;
}
const HandlesContext = createContext({} as IHandlesContextData);

export const HandlesProvider = ({ children }: { children: React.ReactNode }) => {
  const handles = useMemo(() => observe<IHandle[]>([]), []);


  const handleAddOrUpdateHandle = useCallback((handle: IHandle) => {
    set(handles, old => {
      if (old.some(oldHandle => oldHandle._id.value === handle._id.value)) {
        return old;
      }

      return [...old, handle];
    })
  }, []);

  const handleDeleteHandle = useCallback((id: TId) => {
    set(handles, old => [
      ...old.filter(handle => handle._id.value !== id)
    ])
  }, []);


  return (
    <HandlesContext.Provider value={{ handles, addOrUpdate: handleAddOrUpdateHandle, deleteById: handleDeleteHandle }}>
      {children}
    </HandlesContext.Provider>
  );
}

export const useHandlesContext = () => useContext(HandlesContext);
