import { TId } from '../types';
import { IObservable } from 'react-observing';
import { default as React } from 'react';

interface IDragLineContextData {
    nodeId: TId;
    type: 'start' | 'end';
    lineId: TId | undefined;
}
export declare const DragLineProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useDragLineContext: () => IObservable<IDragLineContextData | undefined>;
export {};
