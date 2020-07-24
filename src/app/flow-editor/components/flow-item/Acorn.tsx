import React, { memo } from 'react';
import { useFlowItems } from '../../contexts/FlowItemsContext';
import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';

interface FlowComponentProps {
    textColor?: string;
    item: IFlowItem;

    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Acorn: React.FC<FlowComponentProps> = memo(({ textColor, item, onContextMenu, onMouseDown }) => {
    const { selectItemById } = useFlowItems();

    const strokeColor: string = item.isSelected
        ? "var(--color-botton-bar)"
        : item.hasError
            ? "var(--main-error-color)"
            : item.hasWarning
                ? "var(--main-warning-color)"
                : "transparent";


    const mouseDownMove = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        item.isSelected = true;
        selectItemById(item.id, e.ctrlKey);
        onMouseDown && onMouseDown(e);
    }

    const mouseDownNewConnection = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        item.isSelected = true;
        selectItemById(item.id, e.ctrlKey);
        // onMouseDown && onMouseDown(e);
    }

    return (
        <g
            id={item.id}
            role={item.flowItemType}
            onContextMenu={onContextMenu}
        >
            <text // Move element
                x={item.left + ((item.width || 0) / 2)}
                onMouseDown={mouseDownMove}
                textAnchor={"middle"}
                fontSize={"small"}
                fill={textColor}
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
                strokeWidth={"var(--main-border-width)"}
                onMouseDown={mouseDownNewConnection}
                height={(item.height || 0) + 20}
                style={{ cursor: 'crosshair' }}
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
                style={{ filter: 'gray', pointerEvents: 'none' }}
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
