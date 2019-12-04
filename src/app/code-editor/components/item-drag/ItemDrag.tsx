import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ItemType } from '../../interfaces/ItemFluxo';
import { Start } from '../flow-componets/Start';
import { End } from '../flow-componets/End';

export interface ItemDragProps {
    id?: any
    title: string
    children?: any
    refItemPai?: any
    style: CustomStyle
    allowDrag?: boolean
    isSelecionado: boolean
    hideSourceOnDrag?: boolean
    itemType?: any/* ComponentType */

    /** Devolve 'itemId, top, left'. */
    outputPosition?: Function
    onChangeSelecionado?: Function
}

interface CustomStyle {
    top?: number
    left?: number
    width?: number
    height?: number
    border?: number
}

export const ItemToDrag: React.FC<ItemDragProps> = (props: ItemDragProps) => {
    const { id, outputPosition, title, isSelecionado, onChangeSelecionado = () => { } } = props;
    const { allowDrag, refItemPai, itemType, children } = props;
    const { width, height } = props.style;
    const { top, left } = props.style;

    const [state, setState] = useState({
        isMenuOpen: false,
    });

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: ItemType.ASSIGN, itemProps: { id, left, top, title, itemType } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    window.onmouseup = () => mouseUp;
    window.onmousedown = (event: any) => {
        if (state.isMenuOpen) {
            setState({ ...state, isMenuOpen: false });
        }
    };

    const mouseDown = () => {
        if (refItemPai.current)
            refItemPai.current.onmousemove = mouseMove;
    }

    const mouseUp = (event: any) => {
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;

        onChangeSelecionado(id);
    }

    const mouseMove = (event: any) => {
        outputPosition &&
            outputPosition(
                id,
                event.offsetY - ((height || 0) / 2),
                event.offsetX - ((width || 0) / 2),
            );
    }

    const contextMenu = (event: any) => {
        setState({ ...state, isMenuOpen: true });
        event.preventDefault();
    }

    if (allowDrag) {
        const style: React.CSSProperties = {
            justifyContent: "center",
            backgroundColor: 'gray',
            alignItems: "center",
            marginTop: "5px",
            cursor: 'move',
            padding: "5px",
            width: "100%",
            minHeight: 35,
            fontSize: 10,
        };

        return <div id={id} ref={dragRef} style={{ ...style, backgroundColor: isDragging ? "blue" : "gray" }}>{children || title}</div>;
    } else {
        return (
            <g
                onContextMenu={contextMenu}
                style={{ cursor: 'move' }}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                key={id}
                id={id}
            >
                <text id={id} x={left} y={(top || 0) - 5} fill="#fff">{title}</text>
                {itemType === ItemType.START && <Start id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.ASSIGN && <Start id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.END && <End id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
            </g>
        );
    }
}
