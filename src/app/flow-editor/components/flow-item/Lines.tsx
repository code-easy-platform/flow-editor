import React from 'react';
import { useFlowItemsConnetioncSelector } from '../../shared/hooks';
import { Line } from './Line';

interface LinesProp {
    /**
     * Used to start the context menu for this específic component
     */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Lines: React.FC<LinesProp> = ({ onContextMenu }) => {
    const lines = useFlowItemsConnetioncSelector();

    return <>
        {lines.map(({ id, originId, targetId }, index) => <Line
            id={id}
            key={index}
            originId={originId}
            targetId={targetId}
            onContextMenu={onContextMenu}
        />)}
    </>
}
