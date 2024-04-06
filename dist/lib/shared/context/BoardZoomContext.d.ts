import { default as React } from 'react';

export declare const BoardZoomProvider: ({ children, value }: {
    value: number;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useBoardZoomContext: () => import('react-observing').IObservable<number>;
