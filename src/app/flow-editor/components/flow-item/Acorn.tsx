import React, { memo } from 'react';
import { useFlowItems } from '../../contexts/FlowItemsContext';
import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';

interface FlowComponentProps {
    textColor?: string;
    item: IFlowItem;

    onMouseUp?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Acorn: React.FC<FlowComponentProps> = memo(({ textColor, item, onMouseUp, onContextMenu, onMouseDown }) => {
    const { selectItemById } = useFlowItems();

    const strokeColor: string = item.isSelected
        ? "var(--color-botton-bar)"
        : item.hasError
            ? "var(--main-error-color)"
            : item.hasWarning
                ? "var(--main-warning-color)"
                : "transparent";


    const mouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        item.isSelected = true;
        selectItemById(item.id, e.ctrlKey);
        onMouseDown && onMouseDown(e);
    }

    return (
        <g
            id={item.id}
            onMouseUp={onMouseUp}
            onMouseDown={mouseDown}
            role={item.flowItemType}
            onContextMenu={onContextMenu}
        >
            <text
                textAnchor={"middle"}
                fontSize={"small"}
                fill={textColor}
            >{item.title}</text>
            <rect
                strokeWidth={"var(--main-border-width)"}
                style={{ cursor: 'move', zIndex: 2 }}
                fill="var(--main-background)"
                strokeLinejoin="round"
                height={item.height}
                width={item.width}
                x={item.left}
                id={item.id}
                y={item.top}
                rx={50}
                ry={50}
            ><title>{item.description}</title></rect>
            <rect
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
            <image
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
