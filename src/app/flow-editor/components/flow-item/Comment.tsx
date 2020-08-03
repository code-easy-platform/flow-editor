import React, { memo } from 'react';

import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import { useConfigs, useSizeByText } from '../../shared/hooks';
import { NewConnectionBox } from './line/NewConnectionBox';

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
            <NewConnectionBox
                height={(item.height || 0) + 20}
                width={(item.width || 0) + 20}
                originId={String(item.id)}
                left={item.left - 10}
                top={item.top - 10}
            />
            <foreignObject
                id={item.id}
                y={item.top}
                x={item.left}
                width={item.width}
                height={item.height}
                onMouseDown={handleOnMouseDown}
                onContextMenu={handleOnContextMenu}
                style={{
                    zIndex: 2,
                    cursor: 'move',
                    width: item.width,
                    height: item.height,
                }}
            >
                <div
                    children={item.description}
                    style={{
                        border: `${lineWidth}px solid ${strokeColor}`,
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
        </>
    );
});
