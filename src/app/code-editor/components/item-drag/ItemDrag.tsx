import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ItemType } from '../../interfaces/ItemFluxo';
import { Action } from '../flow-componets/Action';
import { Assign } from '../flow-componets/Assign';
import { Start } from '../flow-componets/Start';
import { End } from '../flow-componets/End';
import { If } from '../flow-componets/IF';

import icons_foreach from './../../../../images/foreach.png';
import icons_switch from './../../../../images/switch.png';
import icons_assign from './../../../../images/assign.png';
import icons_action from './../../../../images/action.png';
import icons_start from './../../../../images/start.png';
import icons_end from './../../../../images/end.png';
import icons_if from './../../../../images/if.png';

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
        /** Usado para não bugar o onchangesucessor da linha que estou trocando.  */
        isMouseDown: false,
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

        setState({ ...state, isMouseDown: true });
    }

    const mouseUp = (event: any) => {
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;

        if (state.isMouseDown) {
            onChangeSelecionado(id);
            setState({ ...state, isMouseDown: false });
        }
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
            alignItems: "center",
            margin: "5px",
            cursor: 'move',
            fontSize: 10,
            width: 30,
        };

        return <div className="toolbar-item">
            {/* {itemType === ItemType.ASSIGN && <img id={id} style={style} ref={dragRef} src={icons_foreach} />} */}
            {/* {itemType === ItemType.ASSIGN && <img id={id} style={style} ref={dragRef} src={icons_switch} />} */}
            {itemType === ItemType.ASSIGN && <img id={id} style={style} ref={dragRef} src={icons_assign} />}
            {itemType === ItemType.ACTION && <img id={id} style={style} ref={dragRef} src={icons_action} />}
            {itemType === ItemType.START && <img id={id} style={style} ref={dragRef} src={icons_start} />}
            {itemType === ItemType.END && <img id={id} style={style} ref={dragRef} src={icons_end} />}
            {itemType === ItemType.IF && <img id={id} style={style} ref={dragRef} src={icons_if} />}
        </div>;
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
                <text id={id} x={left} y={(top || 0) - 5} fill="#fff" >{title}</text>
                {itemType === ItemType.START && <Start id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.ASSIGN && <Assign id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.ACTION && <Action id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.IF && <If id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.END && <End id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
            </g>
        );
    }
}
