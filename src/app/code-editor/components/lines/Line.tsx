import React, { useState, useEffect } from 'react';
import { Utils } from 'code-easy-components';

/** Propriedades aceitas pela linha. */
interface LineProps {
    id: string;
    top1: number;
    top2?: number;
    left1: number;
    left2?: number;
    color?: string;
    lineWidth?: number;
    sucessorIndex?: number;
    lineType?: 'dotted' | 'normal';
    onSucessorChange?(itemId: string | undefined, sucessorId: string, branchIndex: number | undefined): void;
}

export const Line: React.FC<LineProps> = ({ id, onSucessorChange, ...props }) => {
    let { top1 = 0, left2 = 0, top2 = 0 } = props;
    const {
        lineWidth = 1, color = "var(--main-background-highlighted)", left1,
        sucessorIndex, lineType = 'normal',
    } = props;

    if (sucessorIndex === undefined) {
        top2 = top1 + 95;
        left2 = left1;
    }


    const polygonTop: number = (top2 - 50);
    const polygonLeft: number = (left2 - 5);
    const polygonRight: number = (left2 + 5);
    const polygonBottonCenter: number = left2;
    const polygonBotton: number = (top2 - 40);


    const [isSelected, setIsSelected] = useState(false);
    const [position, setPosition] = useState({
        polygonTop: polygonTop,
        polygonLeft: polygonLeft,
        polygonRight: polygonRight,
        polygonBotton: polygonBotton,
        polygonBottonCenter: polygonBottonCenter,
    });
    useEffect(() => {
        setPosition({
            polygonTop: polygonTop,
            polygonLeft: polygonLeft,
            polygonRight: polygonRight,
            polygonBotton: polygonBotton,
            polygonBottonCenter: polygonBottonCenter
        });
    }, [polygonTop, polygonLeft, polygonRight, polygonBotton, polygonBottonCenter]);


    // let rotate: number = 0;
    let rotate: number = Utils.getAngle(isSelected ? position.polygonLeft : left2, isSelected ? position.polygonTop : top2, left1, top1);


    const mouseMove = (event: MouseEvent) => {
        setPosition({
            polygonTop: event.offsetY - 10,
            polygonLeft: event.offsetX - 5,
            polygonRight: event.offsetX + 5,
            polygonBotton: event.offsetY,
            polygonBottonCenter: event.offsetX
        });
    }

    const onMouseUp = (e: any) => {
        e.stopPropagation();
        setIsSelected(false);

        window.onmouseup = null;
        window.onmousemove = null;

        document.body.style.cursor = 'unset';

        setPosition({
            polygonTop: polygonTop,
            polygonLeft: polygonLeft,
            polygonRight: polygonRight,
            polygonBotton: polygonBotton,
            polygonBottonCenter: polygonBottonCenter
        });

        onSucessorChange && onSucessorChange(id, e.target.id, sucessorIndex);

    }

    const onMouseDown = () => {
        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp;

        document.body.style.cursor = 'crosshair';

        setIsSelected(true);
    }

    return (
        <>
            <line
                y1={top1}
                x1={left1}
                id={"line_" + id}
                key={"line_" + id}
                x2={isSelected ? position.polygonLeft + 5 : left2}
                stroke={color || "var(--main-background-highlighted)"}
                strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
                y2={isSelected ? position.polygonTop + 10 : sucessorIndex === undefined ? top2 - 50 : top2}
            />
            {(sucessorIndex !== undefined && !isSelected) &&
                <rect
                    id={id}
                    rx={50}
                    ry={50}
                    width="80"
                    height="80"
                    key={"rect_" + id}
                    y={position.polygonTop + 10}
                    x={position.polygonLeft - 35}
                    fill={"var(--main-background)"}
                />
            }
            <path
                id={"path_" + id}
                key={"path_" + id}
                onMouseDown={onMouseDown}
                fill={"var(--main-background)"}
                style={{
                    cursor: 'crosshair',
                    strokeWidth: lineWidth,
                    transform: `rotate(${rotate}deg)`,
                    fill: color || "var(--main-background-highlighted)",
                    stroke: color || "var(--main-background-highlighted)",
                    transformOrigin: `${isSelected ? position.polygonLeft + 5 : left2}px ${isSelected ? position.polygonTop + 10 : top2}px`,
                }}
                d={`
                    M${isSelected ? position.polygonLeft : polygonLeft}
                    ${isSelected ? position.polygonTop : polygonTop}
                    L${isSelected ? position.polygonBottonCenter : polygonBottonCenter}
                    ${isSelected ? position.polygonBotton : polygonBotton}
                    L${isSelected ? position.polygonRight : polygonRight}
                    ${isSelected ? position.polygonTop : polygonTop} Z`}
            />
        </>
    );
}
