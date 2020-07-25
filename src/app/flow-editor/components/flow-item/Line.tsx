import React, { memo, useEffect, useState, useCallback } from 'react';
import { ILine } from '../../shared/interfaces/FlowItemInterfaces';
import { useConfigs } from '../../contexts/Configurations';
import { Utils } from 'code-easy-components';

interface LineProps {
    /**
     * Used in parent component to move this element in the screen
     */
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    /**
     * Used to start the context menu for this específic component
     */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Line: React.FC<LineProps & ILine> = memo(({ id, left1, top1, description, radius = 40, isCurved, isDisabled, label, left2 = 0, lineType, onContextMenu, onMouseDown, top2 = 0 }) => {
    const { disableOpacity, linesColor, lineWidth } = useConfigs();

    const [basicPosition, setBasicPosition] = useState({
        top1: top1,
        top2: top2,
        left1: left1,
        left2: left2,
        showNewLine: false,
        isLeftToRight: (left2 >= left1),
        rotate: Utils.getAngle(left2, top2, left1, top1),
        lineDistance: Math.hypot((top2 - top1), (left2 - left1)) - (radius + 5),
    });
    useEffect(() => {
        setBasicPosition(oldState => ({
            ...oldState,
            top1: top1,
            top2: top2,
            left1: left1,
            left2: left2,
            isLeftToRight: (left2 >= left1),
            rotate: Utils.getAngle(left2, top2, left1, top1),
            lineDistance: Math.hypot((top2 - top1), (left2 - left1)) - (radius + 5),
        }));
    }, [left1, left2, top1, top2, radius]);

    const polygonTop: number = (basicPosition.top2 - (radius + 15));
    const polygonLeft: number = (basicPosition.left2 - 5);
    const polygonRight: number = (basicPosition.left2 + 5);
    const polygonBottonCenter: number = basicPosition.left2;
    const polygonBotton: number = (basicPosition.top2 - (radius + 5));

    const mouseMove = useCallback((event: MouseEvent) => {
        setBasicPosition(oldBasicPosition => ({
            ...oldBasicPosition,
            showNewLine: true,
            top2: event.offsetY,
            left2: event.offsetX,
            isLeftToRight: (event.offsetX >= left1),
            rotate: Utils.getAngle(event.offsetX, event.offsetY, left1, top1),
            lineDistance: (Math.hypot((event.offsetY - top1), (event.offsetX - left1)) - 40),
        }));
    }, [left1, top1]);

    const onMouseUp = useCallback((e: any) => {
        e.stopPropagation();

        window.onmouseup = null;
        window.onmousemove = null;
        document.body.style.cursor = 'unset';

        setBasicPosition({
            top1: top1,
            top2: top2,
            left1: left1,
            left2: left2,
            showNewLine: false,
            isLeftToRight: (left2 >= left1),
            rotate: Utils.getAngle(left2, top2, left1, top1),
            lineDistance: (Math.hypot((top2 - top1), (left2 - left1)) - 40),
        });

    }, [left1, left2, top1, top2]);

    const mouseDown = useCallback(() => {
        document.body.style.cursor = 'crosshair';
        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp;
    }, [mouseMove, onMouseUp])

    return (
        <g style={{ opacity: isDisabled ? disableOpacity : 1 }}>
            <g style={{ transform: `rotate(${basicPosition.rotate}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1}px` }}>
                <text
                    fontSize={"small"}
                    textAnchor={"middle"}
                    x={basicPosition.left1}
                    fill={"var(--color-white)"}
                    y={basicPosition.top1 + (basicPosition.lineDistance / 2) + (isCurved ? (basicPosition.isLeftToRight ? 35 : -35) : -5)}
                    style={{ transform: `rotate(${basicPosition.isLeftToRight ? 90 : -90}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1 + (basicPosition.lineDistance / 2)}px` }}
                >{label}</text>
            </g>
            <path
                fill={"none"}
                id={"line_" + id}
                key={"line_" + id}
                // onMouseDown={lineOnMouseDown}
                stroke={linesColor || "gray"}
                strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
                style={{
                    transform: `rotate(${basicPosition.rotate}deg)`,
                    transformOrigin: `${basicPosition.left1}px ${basicPosition.top1}px`,
                    display: (!basicPosition.showNewLine && id === undefined) ? 'none' : 'unset',
                }}
                d={`M${basicPosition.left1} ${basicPosition.top1 + 30} Q${basicPosition.left1 - (isCurved ? 50 : 0)} ${basicPosition.top1 + (basicPosition.lineDistance / 2)} ${basicPosition.left1} ${basicPosition.top1 + basicPosition.lineDistance}`}
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
                    fill: linesColor || "gray",
                    stroke: linesColor || "gray",
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
