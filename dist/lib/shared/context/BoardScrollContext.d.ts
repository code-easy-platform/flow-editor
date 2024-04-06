import { IObservable } from 'react-observing';
import { default as React } from 'react';

interface IBoardScrollData {
    top: IObservable<number>;
    left: IObservable<number>;
}
export declare const BoardScrollProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useBoardScrollContext: () => IBoardScrollData;
export {};
