import { TId } from '../types';
import { IObservable } from 'react-observing';
import { default as React, ReactNode } from 'react';

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
    top1: IObservable<number>;
    top2: IObservable<number>;
    left1: IObservable<number>;
    left2: IObservable<number>;
    width1: IObservable<number>;
    width2: IObservable<number>;
    height2: IObservable<number>;
    height1: IObservable<number>;
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
interface IItemsProviderProps {
    items: INode[];
    children: React.ReactNode;
}
export declare const ItemsProvider: ({ children, items }: IItemsProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useItemsContext: () => IItemsContextData;
export declare const useBoardSizes: () => IBoardSizes;
export declare const useSelectedItemsId: () => IObservable<string[]>;
export declare const useIsSelectedItemById: (id: TId) => IObservable<boolean>;
export declare const useToggleSelectedItem: () => (id: TId | TId[], keepSelected?: boolean) => void;
export declare const useDragSelectedItems: () => (movementX: number, movementY: number) => void;
export {};
