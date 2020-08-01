import React, { memo } from 'react';

interface INewConnectionBoxProps {
    id: string;
    top?: number;
    left?: number;
    radius?: number;
    lineWidth?: number;
    isRounded?: boolean;
    cursor?: 'crosshair' | string;
    onMouseDown?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
}
/** Allow create a new connection */
export const NewConnectionBox: React.FC<INewConnectionBoxProps> = memo(({ id, isRounded = false, cursor = 'crosshair', left = 0, lineWidth = 1, onMouseDown, onContextMenu, radius = 0, top = 0 }) => {

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
        <rect
            onContextMenu={handleOnContextMenu}
            onMouseDown={handleOnMouseDown}
            style={{ cursor, zIndex: 3 }}
            strokeWidth={lineWidth}
            rx={isRounded ? 50 : 0}
            ry={isRounded ? 50 : 0}
            height={radius * 2}
            width={radius * 2}
            x={left - radius}
            y={top - radius}
            fill={"black"}
            id={id}
        />
    );
});
