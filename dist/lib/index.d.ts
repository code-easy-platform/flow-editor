import { TId } from './shared/types';
import { IDroppedData } from './FlowEditorBoard';
import { INode } from './shared/context';
import { default as React } from 'react';

export type { INode, ILine, INodeConnection, INodeRenderProps } from './shared/context';
export type { IDroppedData } from './FlowEditorBoard';
export interface IFlowEditorProps {
    items: INode[];
    disableDropInLines?: boolean;
    customCSS?: string;
    snapGridSize?: number;
    backgroundSize?: number;
    backgroundDotColor?: string;
    backgroundColorPaper?: string;
    backgroundColorDefault?: string;
    onRemove?: (ids: TId[]) => void;
    onDrop?: (data: IDroppedData<any>) => void;
}
export declare const FlowEditor: React.FC<IFlowEditorProps>;
