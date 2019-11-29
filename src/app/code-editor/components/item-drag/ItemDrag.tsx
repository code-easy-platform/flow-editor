import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ItemType } from '../../interfaces/ItemFluxo';
import { is } from '@babel/types';

export interface ItemDragProps {
    id?: any
    title: string
    style: CustomStyle
    children?: any
    refItemPai?: any
    allowDrag?: boolean
    componentType?: any/* ComponentType */
    hideSourceOnDrag?: boolean

    /** Devolve 'itemId, top, left'. */
    outputPosition?: Function
}

interface CustomStyle {
    top?: number
    left?: number
    width?: number
    height?: number
    border?: number
}

export const ItemToDrag: React.FC<ItemDragProps> = (props: ItemDragProps) => {
    const { id, outputPosition, title } = props;
    const { allowDrag, refItemPai, children } = props;
    const { width, height, border } = props.style;
    const { top, left } = props.style;

    const [state, setState] = useState({
        isSelecionado: false,
        isMenuOpen: false,
    });

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: ItemType.ASSIGN, itemProps: { id, left, top, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    window.onmouseup = () => mouseUp;
    window.onmousedown = (event: any) => {
        if (state.isMenuOpen) {
            setState({ ...state, isMenuOpen: false });
        }
    };

    if (refItemPai && refItemPai.current) {
        refItemPai.current.onmousedown = () => {
            setState({ ...state, isSelecionado: false });
        }
    }

    const mouseDown = (event: any) => {
        if (Number(event.target.id) !== id && state.isSelecionado) {
            setState({ ...state, isSelecionado: false });
        } else if (Number(event.target.id) === id && state.isSelecionado == false) {
            setState({ ...state, isSelecionado: true });
        }

        if (refItemPai.current) {
            refItemPai.current.onmousemove = mouseMove;
            refItemPai.current.onmousedown = changeSelecionado;
        }
    }

    const changeSelecionado = () => {
        refItemPai.current.onmousedown = () => {
            setState({ ...state, isSelecionado: false });
        }
    }

    const mouseUp = (event: any) => {
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;
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
    } else
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
                    style={{ fill: "gray", cursor: 'move', stroke: state.isSelecionado ? "blue" : "gray", strokeWidth: 1 }}
                    onContextMenu={contextMenu}
                    onMouseDown={mouseDown}
                    onMouseUp={mouseUp}
                ></rect>
            </g>
        );

}
