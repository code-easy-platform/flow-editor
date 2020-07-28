import React, { memo } from 'react';
import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import { useConfigs } from '../../contexts/ConfigurationsContext';
import { useFlowItems } from '../../contexts/FlowItemsContext';

interface CommentProps {
    item: IFlowItem;

    /** Used in parent component to move this element in the screen */
    onMouseDown?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
    /** Used to start the context menu for this específic component */
    onContextMenu?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
}
export const Comment: React.FC<CommentProps> = memo(({ item, onMouseDown, onContextMenu }) => {
    const { flowItemSelectedColor, commentColor } = useConfigs();
    const { getSizeByText } = useFlowItems();

    const strokeColor: string = item.isSelected ? `${flowItemSelectedColor}` : "#383321";

    const { height, width } = getSizeByText(item.description || '');
    item.height = height;
    item.width = width;

    return (
        /* <g>
            <rect
                strokeWidth={'var(--main-border-width)'}
                style={{ cursor: 'move' }}
                onMouseDown={onMouseDown}
                stroke={strokeColor}
                height={item.height}
                fill={commentColor}
                width={item.width}
                x={item.left}
                y={item.top}
            />
            <text
                x={item.left + ((item.width || 0) / 2)}
                y={item.top + 5 + (item.height / 2)}
                style={{ whiteSpace: 'pre-line', }}
                textAnchor={"middle"}
                fontSize={"small"}
            >{item.description}</text>
        </g> */
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
                className={"padding-xs"}
                style={{
                    border: `var(--main-border-width) solid ${strokeColor}`,
                    height: '-webkit-fill-available',
                    width: '-webkit-fill-available',
                    backgroundColor: commentColor,
                    whiteSpace: 'pre-line',
                    //pointerEvents: 'none',
                    textAlign: 'start',
                    fontSize: 'small',
                    color: '#fff',
                }}
            />
        </foreignObject>
    );
});
