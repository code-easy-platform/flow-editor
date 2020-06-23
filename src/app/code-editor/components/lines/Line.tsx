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

    const { lineWidth = 1, color = "var(--main-background-highlighted)", sucessorIndex, lineType = 'normal' } = props;

    let { top1 = 0, left1 = 0, left2 = 0, top2 = 0 } = props;
    if (sucessorIndex === undefined) {
        top2 = top1 + 85;
        left2 = left1;
    }

    const [basicPosition, setBasicPosition] = useState({
        top1: top1,
        top2: top2,
        left1: left1,
        left2: left2,
    });
    useEffect(() => {
        setBasicPosition({
            top1: top1,
            top2: top2,
            left1: left1,
            left2: left2,
        });
    }, [left1, left2, top1, top2]);


    const isDragging = ((basicPosition.top2 !== top2) || (basicPosition.left2 !== left2));

    const polygonLeft: number = (basicPosition.left2 - 5);
    const polygonRight: number = (basicPosition.left2 + 5);
    const polygonBottonCenter: number = basicPosition.left2;
    const polygonTop: number = (basicPosition.top2 - (isDragging ? 10 : 50));
    const polygonBotton: number = (basicPosition.top2 - (isDragging ? 0 : 40));

    /** Encontra o ângulo para rotação da linha */
    const rotate = Utils.getAngle(basicPosition.left2, basicPosition.top2, basicPosition.left1, basicPosition.top1);

    /** Encontra a hipotenusa do triângulo que é formado x1-y1 e x2 e y2 */
    const lineDistance = (Math.hypot((basicPosition.top2 - basicPosition.top1), (basicPosition.left2 - basicPosition.left1)) - (isDragging ? 0 : 40));

    const mouseMove = (event: MouseEvent) => {
        setBasicPosition({
            ...basicPosition,
            top2: event.offsetY,
            left2: event.offsetX,
        });
    }

    const onMouseUp = (e: any) => {
        e.stopPropagation();

        window.onmouseup = null;
        window.onmousemove = null;
        document.body.style.cursor = 'unset';

        setBasicPosition({
            top1: top1,
            top2: top2,
            left1: left1,
            left2: left2,
        });

        onSucessorChange && onSucessorChange(id, e.target.id, sucessorIndex);
    }

    const onMouseDown = () => {
        document.body.style.cursor = 'crosshair';
        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp;
    }

    return (
        <>
            <line
                id={"line_" + id}
                key={"line_" + id}
                y1={basicPosition.top1}
                x1={basicPosition.left1}
                x2={basicPosition.left1}
                y2={basicPosition.top1 + lineDistance}
                stroke={color || "var(--main-background-highlighted)"}
                strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
                style={{ transform: `rotate(${rotate}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1}px` }}
            />
            <path
                id={"path_" + id}
                key={"path_" + id}
                onMouseDown={onMouseDown}
                fill={"var(--main-background)"}
                d={`M${polygonLeft} ${polygonTop} L${polygonBottonCenter} ${polygonBotton} L${polygonRight} ${polygonTop} Z`}
                style={{
                    cursor: 'crosshair',
                    strokeWidth: lineWidth,
                    transform: `rotate(${rotate}deg)`,
                    fill: color || "var(--main-background-highlighted)",
                    stroke: color || "var(--main-background-highlighted)",
                    transformOrigin: `${basicPosition.left2}px ${basicPosition.top2}px`,
                }}
            />
        </>
    );
}
