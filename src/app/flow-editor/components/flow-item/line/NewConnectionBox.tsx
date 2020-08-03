import React, { memo, useRef } from 'react';

import { Line } from './Line';

interface INewConnectionBoxProps {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    radius?: number;
    originId: string;
    lineWidth?: number;
    isRounded?: boolean;
    cursor?: 'crosshair' | string;
    onMouseDown?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
}
/** Allow create a new connection */
export const NewConnectionBox: React.FC<INewConnectionBoxProps> = memo(({ originId, left = 0, top = 0, height = 0, width = 0, isRounded = false, lineWidth = 1, cursor = 'crosshair', radius = 0, onMouseDown, onContextMenu }) => {

    const ref = useRef<SVGRectElement | null>(null);

    const handleOnContextMenu = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }

    const handleOnMouseDown = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }

    return (
        <>
            <Line
                id={undefined}
                useResetLine={true}
                originId={originId}
                targetId={undefined}
                newConnectionBox={ref}
            />
            <rect
                onContextMenu={handleOnContextMenu}
                onMouseDown={handleOnMouseDown}
                style={{ cursor, zIndex: 3 }}
                strokeWidth={lineWidth}
                rx={isRounded ? 50 : 0}
                ry={isRounded ? 50 : 0}
                fill={"transparent"}
                height={height}
                width={width}
                id={originId}
                ref={ref}
                x={left}
                y={top}
            />
        </>
    );
});
