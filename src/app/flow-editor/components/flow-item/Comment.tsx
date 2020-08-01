import React, { memo } from 'react';

import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import { useConfigs, useSizeByText } from '../../shared/hooks';

interface CommentProps {
    item: IFlowItem;

    /** Used in parent component to move this element in the screen */
    onMouseDown?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
    /** Used to start the context menu for this específic component */
    onContextMenu?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
}
export const Comment: React.FC<CommentProps> = memo(({ item, onMouseDown, onContextMenu }) => {
    const { flowItemSelectedColor, commentColor, lineWidth, flowItemErrorColor, flowItemWarningColor, commentTextColor } = useConfigs();
    const getSizeByText = useSizeByText();

    const strokeColor: string = item.isSelected
        ? `${flowItemSelectedColor}`
        : item.hasError
            ? `${flowItemErrorColor}`
            : item.hasWarning
                ? `${flowItemWarningColor}`
                : "transparent";

    const { height, width } = getSizeByText(item.description || '');
    item = { ...item, height, width };

    return (
        <foreignObject
            id={item.id}
            y={item.top}
            x={item.left}
            width={item.width}
            height={item.height}
            onMouseDown={onMouseDown}
            onContextMenu={onContextMenu}
            style={{
                zIndex: 2,
                cursor: 'move',
                width: item.width,
                height: item.height,
            }}
        >
            <div
                onContextMenu={onContextMenu}
                children={item.description}
                onMouseDown={onMouseDown}
                style={{
                    border: `${lineWidth} solid ${strokeColor}`,
                    height: '-webkit-fill-available',
                    width: '-webkit-fill-available',
                    backgroundColor: commentColor,
                    color: commentTextColor,
                    whiteSpace: 'pre-line',
                    pointerEvents: 'none',
                    textAlign: 'start',
                    fontSize: 'small',
                    padding: 8,
                }}
            />
        </foreignObject>
    );
});
