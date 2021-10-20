import React, { memo, useCallback, useMemo } from 'react';

interface ArrowProps {
    top?: number;
    left?: number;
    rotate?: number;
    radius?: number;
    visible?: boolean;
    lineWidth?: number;
    useEvents?: boolean;
    strokeColor?: string;
    cursor: 'crosshair' | string;
    onMouseDown?(e: React.MouseEvent<SVGPathElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGPathElement, MouseEvent>): void;
}
/** Render the arrow in the line */
export const Arrow: React.FC<ArrowProps> = memo(({ onMouseDown, onContextMenu, left = 0, top = 0, radius = 0, rotate = 0, visible = true, lineWidth = 1, cursor = 'crosshair', strokeColor = 'gray', useEvents = true }) => {

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

    const polygonPath = useMemo(() => `M${-5} ${-10} L${0} ${0} L${5} ${-10} Z`, []);

    return (
        <g style={{ transform: `translate(${left}px, ${top - radius}px)` }}>
            <path // Render the arrow in the line
                d={polygonPath}
                fill={strokeColor}
                onMouseDown={handleOnMouseDown}
                onContextMenu={handleOnContextMenu}
                style={{
                    cursor,
                    strokeWidth: lineWidth,
                    transform: `rotate(${rotate}deg)`,
                    display: visible ? 'none' : 'unset',
                    transformOrigin: `${0}px ${radius}px`,
                    pointerEvents: useEvents ? 'unset' : 'none',
                }}
            />
        </g>
    );
});
