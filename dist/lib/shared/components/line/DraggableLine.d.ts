import { TId } from '../../types';
import { default as React } from 'react';

interface IDraggableLineProps {
    nodeId: TId;
    top1: number;
    top2: number;
    left1: number;
    left2: number;
    width1: number;
    width2: number;
    height1: number;
    height2: number;
    lineWidth: number;
    isCurved?: boolean;
    newConnection?: boolean;
    lineId: TId | undefined;
    onDragLineEnd?: () => void;
    onDragLineStart?: () => void;
    position1FromCenter?: boolean;
    disableStartDraggable?: boolean;
}
export declare const DraggableLine: React.FC<IDraggableLineProps>;
export {};
