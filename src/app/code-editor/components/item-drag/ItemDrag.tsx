import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FluxoComponentTypes } from '../../enuns/FluxoList';
import { Line } from '../lines/Line';
// import ComponentType from '../../../../../../../../shared/enuns/ComponentType';
// import { Line } from '../../../../../../../../shared/components/lines/Line';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export interface ItemDragProps {
    id?: any
    title: string
    style: CustomStyle
    children?: any
    refItemPai?: any
    allowDrag?: boolean
    componentType?: any/* ComponentType */
    hideSourceOnDrag?: boolean

    onSucessorChange?: Function
    /** Devolve 'itemId, top, left'. */
    outputPosition: Function
}

interface CustomStyle {
    top?: number
    left?: number
    width?: number
    height?: number
    border?: number
    lineTargetTop?: number
    lineTargetLeft?: number
}

export const ItemToDrag: React.FC<ItemDragProps> = (props: ItemDragProps) => {
    const { top, left, lineTargetLeft, lineTargetTop } = props.style;
    const { componentType, id, outputPosition, title } = props;
    const { allowDrag, refItemPai, children } = props;
    const { width, height, border } = props.style;
    const { onSucessorChange } = props;

    const [isSelecionado, setIsSelecionado] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: componentType || FluxoComponentTypes.flowItem, itemDetail: { id, left, top, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    window.onmouseup = () => mouseUp;
    window.onmousedown = () => {
        if (isMenuOpen)
            setIsMenuOpen(false);
    };

    const mouseDown = () => {
        setIsSelecionado(true);
        if (refItemPai.current)
            refItemPai.current.onmousemove = mouseMove;
    }

    const mouseUp = (event: any) => {
        setIsSelecionado(false);
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;
    }

    const mouseMove = (event: any) => {
        outputPosition(
            id,
            event.offsetY - ((height || 0) / 2),
            event.offsetX - ((width || 0) / 2),
        );
    }

    const contextMenu = (event: any) => {
        setIsMenuOpen(true);
        event.preventDefault();
    }

    if (allowDrag)
        return <div id={id} ref={dragRef} style={{ ...style, left, top, backgroundColor: isDragging ? "blue" : "gray" }}>{children}</div>;
    else
        return (
            <g key={id} id={id} >
                <text x={left} y={(top || 0) - 5} fill="#fff">{title}</text>
                <rect
                    id={id}
                    y={top}
                    x={left}
                    ry={border}
                    rx={border}
                    width={width}
                    height={height}
                    style={{ ...style, fill: "gray", stroke: isSelecionado ? "blue" : "gray", strokeWidth: 1 }}
                    onContextMenu={contextMenu}
                    onMouseDown={mouseDown}
                    onMouseUp={mouseUp}
                ></rect>
                <Line
                    id={id}
                    key={id}
                    color="gray"
                    top1={(top || 0) + (height || 0) - 15}
                    left1={(left || 0) + ((width || 0) / 2)}
                    top2={ lineTargetTop ? (lineTargetTop || 0) : 10}
                    left2={ lineTargetLeft ? (lineTargetLeft || 0) : 10}
                    onSucessorChange={onSucessorChange}
                    refItemPai={refItemPai}
                />
            </g>
        );

}
