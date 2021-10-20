import React, { memo, useCallback } from 'react';

interface SingleLineProps {
    id: string;
    top1?: number;
    top2?: number;
    left1?: number;
    left2?: number;
    rotate?: number;
    visible?: boolean;
    isCurved?: boolean;
    lineWidth?: number;
    strokeColor?: string;
    lineDistance?: number;
    lineType?: 'normal' | 'dotted',
    onMouseDown?(e: React.MouseEvent<SVGPathElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGPathElement, MouseEvent>): void;
}
export const SingleLine: React.FC<SingleLineProps> = memo(({ id, left1 = 0, top1 = 0, left2 = 0, top2 = 0, lineWidth = 1, lineType = 'normal', lineDistance = 0, rotate = 0, strokeColor = 'gray', visible = true, isCurved = false, onMouseDown, onContextMenu }) => {

    const handleOnContextMenu = useCallback((e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }, [onContextMenu]);

    const handleOnMouseDown = useCallback((e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }, [onMouseDown]);

    if (!isCurved) return (
        <line
            y1={top1}
            y2={top2}
            x1={left1}
            x2={left2}
            fill={"none"}
            id={"line_" + id}
            stroke={strokeColor}
            strokeWidth={lineWidth}
            onMouseDown={handleOnMouseDown}
            onContextMenu={handleOnContextMenu}
            strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
            style={{
                transformOrigin: `${left1}px ${top1}px`,
            }}
        />
    );

    return (<>
        <path
            fill={"none"}
            id={"line_" + id}
            stroke={strokeColor}
            strokeWidth={lineWidth}
            onMouseDown={handleOnMouseDown}
            onContextMenu={handleOnContextMenu}
            strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
            d={`M${left1} ${top1} Q${left1 - (isCurved ? 50 : 0)} ${top1 + (lineDistance / 2)} ${left1} ${top1 + lineDistance}`}
            style={{
                transform: `rotate(${rotate}deg)`,
                display: visible ? 'none' : 'unset',
                transformOrigin: `${left1}px ${top1}px`,
            }}
        />
        <path
            fill={"none"}
            strokeWidth={14}
            id={"line_" + id}
            stroke={"transparent"}
            onMouseDown={handleOnMouseDown}
            onContextMenu={handleOnContextMenu}
            style={{
                transform: `rotate(${rotate}deg)`,
                transformOrigin: `${left1}px ${top1}px`,
            }}
            strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
            d={`M${left1} ${top1} Q${left1 - (isCurved ? 50 : 0)} ${top1 + (lineDistance / 2)} ${left1} ${top1 + lineDistance}`}
        />
    </>);
});
