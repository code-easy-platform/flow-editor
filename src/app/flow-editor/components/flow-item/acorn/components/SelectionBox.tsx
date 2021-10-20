import React, { memo } from 'react';

interface SelectionBoxProps {
    onMouseDown?(event: React.MouseEvent<SVGRectElement, MouseEvent>): void;
    allowConnection?: boolean;
    backgroundColor?: string;
    fullDraggable?: boolean;
    strokeColor?: string;
    strokeWidth?: number;
    height: number;
    width: number;
    id: string;
}
/** Render image icon */
export const SelectionBox: React.FC<SelectionBoxProps> = memo(({ height, width, id, strokeColor, strokeWidth, fullDraggable, backgroundColor, allowConnection, onMouseDown }) => {
    return (
        <>
            <rect // Help in the background
                style={{ pointerEvents: 'none' }}
                fill={backgroundColor}
                height={height}
                width={width}
                id={id}
                rx={50}
                ry={50}
            />
            <rect // Move element
                data-allow-connection={String(allowConnection === undefined ? true : !!allowConnection)}
                height={(height || 0) + (fullDraggable ? ((height || 0) / 3) : 0)}
                style={{ cursor: 'move' }}
                onMouseDown={onMouseDown}
                y={(height || 0) / 3}
                fill={"transparent"}
                width={width}
                id={id}
            ></rect>
            <rect // Selection
                style={{ pointerEvents: 'none' }}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                stroke={strokeColor}
                fill={"transparent"}
                height={height}
                width={width}
            />
        </>
    );
});
