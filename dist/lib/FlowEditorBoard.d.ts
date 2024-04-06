import { TId } from './shared/types';
import { default as React } from 'react';

export interface IDroppedData<T> {
    data: T;
    top: number;
    left: number;
    target: {
        lineId?: TId;
        nodeId?: TId;
        type: 'board' | 'line';
    };
}
interface IFlowEditorBoardProps {
    disableDropInLines?: boolean;
    backgroundSize?: number;
    backgroundDotColor?: string;
    backgroundColorPaper?: string;
    backgroundColorDefault?: string;
    onRemove?: (ids: TId[]) => void;
    onDrop?: (data: IDroppedData<any>) => void;
}
export declare const FlowEditorBoard: React.FC<IFlowEditorBoardProps>;
export {};
