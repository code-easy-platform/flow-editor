import React, { memo, useEffect, useState, useCallback } from 'react';
import { Utils } from 'code-easy-components';

import { ILine } from '../../shared/interfaces/FlowItemInterfaces';
import { useConfigs } from '../../contexts/ConfigurationsContext';
import { useFlowItems } from '../../contexts/FlowItemsContext';

interface LineProps extends ILine {
    /**
     * Used in parent component to move this element in the screen
     */
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    /**
     * Used to start the context menu for this específic component
     */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Line: React.FC<LineProps> = memo(({ id, originId, left, top, description, radius = 40, isCurved, isDisabled, isSelected, label, left2 = 0, lineType, onContextMenu, onMouseDown, top2 = 0 }) => {
    const { disableOpacity, linesColor, lineWidth, flowItemSelectedColor } = useConfigs();
    const { selectItemById, createOrUpdateConnection } = useFlowItems();

    // Sets the color of the line when selected
    const strokeColor: string = isSelected ? `${flowItemSelectedColor}` : `${linesColor}`;

    const [basicPosition, setBasicPosition] = useState({
        isCurved,
        top1: top,
        top2: top2,
        left1: left,
        left2: left2,
        showNewLine: false,
        isLeftToRight: (left2 >= left),
        rotate: Utils.getAngle(left2, top2, left, top),
        lineDistance: Math.hypot((top2 - top), (left2 - left)) - (radius + 5),
    });
    useEffect(() => {
        setBasicPosition(oldState => ({
            ...oldState,
            isCurved,
            top1: top,
            top2: top2,
            left1: left,
            left2: left2,
            isLeftToRight: (left2 >= left),
            rotate: Utils.getAngle(left2, top2, left, top),
            lineDistance: Math.hypot((top2 - top), (left2 - left)) - (radius + 5),
        }));
    }, [left, left2, top, top2, radius, isCurved]);

    const polygonTop: number = (basicPosition.top2 - (radius + 15));
    const polygonLeft: number = (basicPosition.left2 - 5);
    const polygonRight: number = (basicPosition.left2 + 5);
    const polygonBottonCenter: number = basicPosition.left2;
    const polygonBotton: number = (basicPosition.top2 - (radius + 5));

    const mouseMove = useCallback((event: MouseEvent) => {
        setBasicPosition(oldBasicPosition => ({
            ...oldBasicPosition,
            isCurved: false,
            showNewLine: true,
            top2: event.offsetY,
            left2: event.offsetX,
            isLeftToRight: (event.offsetX >= left),
            rotate: Utils.getAngle(event.offsetX, event.offsetY, left, top),
            lineDistance: (Math.hypot((event.offsetY - top), (event.offsetX - left)) - 40),
        }));
    }, [left, top]);

    const onMouseUp = useCallback((e: any) => {
        e.stopPropagation();

        createOrUpdateConnection(id, originId, e.target.id);

        window.onmouseup = null;
        window.onmousemove = null;
        document.body.style.cursor = 'unset';

        setBasicPosition({
            isCurved,
            top1: top,
            top2: top2,
            left1: left,
            left2: left2,
            showNewLine: false,
            isLeftToRight: (left2 >= left),
            rotate: Utils.getAngle(left2, top2, left, top),
            lineDistance: (Math.hypot((top2 - top), (left2 - left)) - 40),
        });

    }, [left, left2, top, top2, isCurved, id, originId, createOrUpdateConnection]);

    const mouseDown = useCallback((e: any) => {
        e.stopPropagation();

        document.body.style.cursor = 'crosshair';
        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp;
        selectItemById(id, e.ctrlKey);
    }, [mouseMove, onMouseUp, selectItemById, id]);

    const handleSelectLine = (e: any) => {
        e.stopPropagation();
        selectItemById(id, e.ctrlKey);
    }

    return (
        <g style={{ opacity: isDisabled ? disableOpacity : 1 }}>
            <g style={{ transform: `rotate(${basicPosition.rotate}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1}px` }}>
                <text
                    fontSize={"small"}
                    textAnchor={"middle"}
                    x={basicPosition.left1}
                    fill={"var(--color-white)"}
                    onMouseDown={handleSelectLine}
                    y={basicPosition.top1 + (basicPosition.lineDistance / 2) + (basicPosition.isCurved ? (basicPosition.isLeftToRight ? 35 : -35) : -5)}
                    style={{ transform: `rotate(${basicPosition.isLeftToRight ? 90 : -90}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1 + (basicPosition.lineDistance / 2)}px` }}
                >{label}</text>
            </g>
            <path
                fill={"none"}
                id={"line_" + id}
                key={"line_" + id}
                stroke={strokeColor || "gray"}
                onMouseDown={handleSelectLine}
                strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
                style={{
                    transform: `rotate(${basicPosition.rotate}deg)`,
                    transformOrigin: `${basicPosition.left1}px ${basicPosition.top1}px`,
                    display: (!basicPosition.showNewLine && id === undefined) ? 'none' : 'unset',
                }}
                d={`M${basicPosition.left1} ${basicPosition.top1 + 30} Q${basicPosition.left1 - (basicPosition.isCurved ? 50 : 0)} ${basicPosition.top1 + (basicPosition.lineDistance / 2)} ${basicPosition.left1} ${basicPosition.top1 + basicPosition.lineDistance}`}
            />
            <path
                id={"path_" + id}
                key={"path_" + id}
                onMouseDown={mouseDown}
                fill={"var(--main-background)"}
                d={`M${polygonLeft} ${polygonTop} L${polygonBottonCenter} ${polygonBotton} L${polygonRight} ${polygonTop} Z`}
                style={{
                    cursor: 'crosshair',
                    strokeWidth: lineWidth,
                    fill: strokeColor || "gray",
                    stroke: strokeColor || "gray",
                    transform: `rotate(${basicPosition.rotate}deg)`,
                    transformOrigin: `${basicPosition.left2}px ${basicPosition.top2}px`,
                    display: (!basicPosition.showNewLine && id === undefined) ? 'none' : 'unset',
                }}
            />
            {id === undefined && <rect // Allow create a new connection
                style={{ cursor: 'crosshair', zIndex: 3 }}
                strokeWidth={"var(--main-border-width)"}
                x={basicPosition.left2 - radius}
                y={basicPosition.top2 - radius}
                onMouseDown={mouseDown}
                fill={"transparent"}
                height={radius * 2}
                width={radius * 2}
                id={id}
                rx={50}
                ry={50}
            />}
            <title>{description}</title>
        </g>
    );
});
