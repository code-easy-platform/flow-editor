import React, { memo, useCallback } from 'react';
import { useFlowItems } from '../../contexts/FlowItemsContext';
import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import { useConfigs } from '../../contexts/Configurations';

interface FlowComponentProps {
    item: IFlowItem;

    /** Used in parent component to move this element in the screen */
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    /** Used to start the context menu for this específic component */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Acorn: React.FC<FlowComponentProps> = memo(({ item, onContextMenu, onMouseDown }) => {
    const { flowItemErrorColor, flowItemTextColor, flowItemWarningColor, flowItemSelectedColor } = useConfigs();
    const { selectItemById } = useFlowItems();

    const strokeColor: string = item.isSelected
        ? `${flowItemSelectedColor}`
        : item.hasError
            ? `${flowItemErrorColor}`
            : item.hasWarning
                ? `${flowItemWarningColor}`
                : "transparent";

    const mouseDownMove = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (item.isDisabled) return;
        e.stopPropagation();
        selectItemById(item.id, e.ctrlKey);
        onMouseDown && onMouseDown(e);
    }

    const mouseDownNewConnection = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        item.isSelected = true;
        selectItemById(item.id, e.ctrlKey);
        // onMouseDown && onMouseDown(e);
    }

    const contextMenu = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }, [onContextMenu]);

    return (
        <g
            id={item.id}
            role={item.flowItemType}
            onContextMenu={contextMenu}
        >
            <text // Move element and display their title
                x={item.left + ((item.width || 0) / 2)}
                onMouseDown={mouseDownMove}
                fill={flowItemTextColor}
                textAnchor={"middle"}
                fontSize={"small"}
                y={item.top - 5}
            >{item.title}</text>
            <rect // Ajuda no backbround
                strokeWidth={"var(--main-border-width)"}
                fill="var(--main-background)"
                strokeLinejoin="round"
                height={item.height}
                width={item.width}
                x={item.left}
                id={item.id}
                y={item.top}
                rx={50}
                ry={50}
            />
            <rect // Selection
                strokeWidth={"var(--main-border-width)"}
                style={{ pointerEvents: 'none' }}
                strokeLinejoin="round"
                stroke={strokeColor}
                height={item.height}
                fill={"transparent"}
                width={item.width}
                x={item.left}
                id={item.id}
                y={item.top}
            />
            <rect // Allow create a new connection
                onMouseDown={item.isDisabledNewConnetions ? mouseDownMove : mouseDownNewConnection}
                style={{ cursor: item.isDisabledNewConnetions ? 'move' : 'crosshair' }}
                strokeWidth={"var(--main-border-width)"}
                height={(item.height || 0) + 20}
                width={(item.width || 0) + 20}
                fill={"transparent"}
                x={item.left - 10}
                y={item.top - 10}
                id={item.id}
                rx={50}
                ry={50}
            ><title>{item.description}</title></rect>
            <rect // Move element
                strokeWidth={"var(--main-border-width)"}
                y={item.top - ((item.height || 0) / 3)}
                style={{ cursor: 'move', zIndex: 2 }}
                onMouseDown={mouseDownMove}
                height={item.height}
                fill={"transparent"}
                width={item.width}
                x={item.left}
                id={item.id}
            ><title>{item.description}</title></rect>
            <image // Render icon
                style={{ pointerEvents: 'none' }}
                xlinkTitle={item.description}
                xlinkHref={item.icon}
                stroke={strokeColor}
                height={item.height}
                width={item.width}
                x={item.left}
                y={item.top}
            />
        </g>
    );
});
