import React, { memo } from 'react';

interface ArrowProps {
    id: string;
    top?: number;
    left?: number;
    radius?: number;
    rotate?: number;
    visible?: boolean;
    lineWidth?: number;
    strokeColor?: string;
    cursor: 'crosshair' | string;
    onMouseDown?(e: React.MouseEvent<SVGPathElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGPathElement, MouseEvent>): void;
}
/** Render the arrow in the line */
export const Arrow: React.FC<ArrowProps> = memo(({ onMouseDown, onContextMenu, id, left = 0, top = 0, rotate = 0, visible = true, lineWidth = 1, strokeColor = 'gray', radius = 0 }) => {

    const polygonTop: number = (top - (radius + 15));
    const polygonLeft: number = (left - 5);
    const polygonRight: number = (left + 5);
    const polygonBottonCenter: number = left;
    const polygonBotton: number = (top - (radius + 5));

    const handleOnContextMenu = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }

    const handleOnMouseDown = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }

    return (
        <path // Render the arrow in the line
            id={"path_" + id}
            fill={strokeColor}
            onMouseDown={handleOnMouseDown}
            onContextMenu={handleOnContextMenu}
            d={`M${polygonLeft} ${polygonTop} L${polygonBottonCenter} ${polygonBotton} L${polygonRight} ${polygonTop} Z`}
            style={{
                fill: strokeColor,
                cursor: 'crosshair',
                stroke: strokeColor,
                strokeWidth: lineWidth,
                transform: `rotate(${rotate}deg)`,
                display: visible ? 'none' : 'unset',
                transformOrigin: `${left}px ${top}px`,
            }}
        />
    );
});
