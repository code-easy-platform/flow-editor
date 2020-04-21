import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ItemType } from '../../models/ItemFluxo';
import { FlowComponent } from './FlowComponent';

import icons_comment from './../../shared/images/comment.png';
import icons_foreach from './../../shared/images/foreach.png';
import icons_switch from './../../shared/images/switch.png';
import icons_assign from './../../shared/images/assign.png';
import icons_action from './../../shared/images/action.png';
import icons_start from './../../shared/images/start.png';
import icons_end from './../../shared/images/end.png';
import icons_if from './../../shared/images/if.png';
import { FlowComment } from './FlowComment';

/** Usado para definir o tipo de input de parâmetros no item drag. */
export interface ItemDragProps {
    id?: any;
    title: string;
    children?: any;
    refItemPai?: any;
    hasError?: boolean;
    style: CustomStyle;
    allowDrag?: boolean;
    isSelected: boolean;
    hideSourceOnDrag?: boolean;
    itemType?: any;/* ComponentType */

    /** Devolve 'itemId, top, left'. */
    outputPosition?: Function;
    onChangeSelecionado?: Function;
    onContextMenu?(data?: any, e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
}

/** Auxilia na hora de passar configurações para o editor de fluxo. */
interface CustomStyle {
    top?: number
    left?: number
    width?: number
    height?: number
    border?: number
}

/** Usado para representar os itens de lógica no fluxo do editor e na toolbar. */
export const ItemToDrag: React.FC<ItemDragProps> = (props: ItemDragProps) => {
    const {
        isSelected, onChangeSelecionado = () => { },
        id, outputPosition, onContextMenu,
        allowDrag, refItemPai, itemType, hasError
    } = props;

    let { title } = props;

    const { width, height, top, left } = props.style;

    /** Usado para manter e gerenciar o stado deste componente. */
    const [state, setState] = useState({
        /** Usado para não bugar o onchangesucessor da linha que estou trocando.  */
        isMouseDown: false,
    });

    const sucessores: number[] = [0];

    /** Permite que uym elemento seja arrastado e adicionado dentro do editor de fluxo. */
    const [, dragRef] = useDrag({
        item: { type: itemType, itemProps: { id, left, top, title, itemType, sucessor: sucessores } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    window.onmouseup = () => mouseUp;

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const mouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        onChangeSelecionado(id, e);
        if (refItemPai.current)
            refItemPai.current.onmousemove = mouseMove;

        setState({ ...state, isMouseDown: true });
    }

    /**
     * Ajuda a evitar que bugs aconteçam por estar uma fun declarada
     * na ref do svg que está no container de fora.
     * 
     * Também serve para fechar o menu de contexto.
     */
    const mouseUp = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;

        if (state.isMouseDown) {
            onChangeSelecionado(id, e);
            setState({ ...state, isMouseDown: false });
        }
    }

    /** Quando um item estiver selecionado e for arrastado na tale esta fun vai fazer isso acontecer. */
    const mouseMove = (event: any) => {
        outputPosition &&
            outputPosition(
                id,
                event.offsetY - ((height || 0) / 2),
                event.offsetX - ((width || 0) / 2),
                event,
            );
    }

    // Assim que configurado exibirá o menu de contexto deste item corrente.
    const contextMenu = (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (onContextMenu) {
            event.preventDefault();
            onContextMenu({ itemId: id, itemType: itemType }, event);
        }
    }

    /** Com base se é permitido ou não usar o "drag and drop" ele reinderiza o item na tela. */
    if (allowDrag) {
        const style: React.CSSProperties = {
            justifyContent: "center",
            alignItems: "center",
            cursor: "move",
            margin: "5px",
            fontSize: 10,
            width: 30,
        };

        return <div tabIndex={0} className="toolbar-item">
            {itemType === ItemType.COMMENT && <img id={id} title="COMMENT" style={style} ref={dragRef} src={icons_comment} alt="COMMENT" />}
            {itemType === ItemType.FOREACH && <img id={id} title="FOREACH" style={style} ref={dragRef} src={icons_foreach} alt="FOREACH" />}
            {itemType === ItemType.SWITCH && <img id={id} title="SWITCH" style={style} ref={dragRef} src={icons_switch} alt="SWITCH" />}
            {itemType === ItemType.ASSIGN && <img id={id} title="ASSIGN" style={style} ref={dragRef} src={icons_assign} alt="ASSIGN" />}
            {itemType === ItemType.ACTION && <img id={id} title="ACTION" style={style} ref={dragRef} src={icons_action} alt="ACTION" />}
            {itemType === ItemType.START && <img id={id} title="START" style={style} ref={dragRef} src={icons_start} alt="START" />}
            {itemType === ItemType.END && <img id={id} title="END" style={style} ref={dragRef} src={icons_end} alt="END" />}
            {itemType === ItemType.IF && <img id={id} title="IF" style={style} ref={dragRef} src={icons_if} alt="IF" />}
        </div>;
    } else {

        // Ajusta o tamanho do titulo para não ficar muito grande
        title = title.length < 10 ? title : title.slice(0, 15);

        /** Reinderiza um tipo de tag svg na tela, somente dentro do editor de fluxo. */
        return (
            <g
                onContextMenu={contextMenu}
                style={{ cursor: 'move' }}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                key={id}
                id={id}
            >
                <text x={(left || 0) + ((width || 0) / 2)} textAnchor="middle" fill="#fff" y={(top || 0) - 5} id={id}>{title}</text>
                {itemType === ItemType.COMMENT && <FlowComment id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} name="COMMENT" childImage={icons_comment} />}
                {itemType === ItemType.FOREACH && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} name="FOREACH" childImage={icons_foreach} />}
                {itemType === ItemType.ASSIGN && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} name="ASSIGN" childImage={icons_assign} />}
                {itemType === ItemType.SWITCH && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} name="SWITCH" childImage={icons_switch} />}
                {itemType === ItemType.ACTION && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} name="ACTION" childImage={icons_action} />}
                {itemType === ItemType.START && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} name="START" childImage={icons_start} />}
                {itemType === ItemType.END && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} name="END" childImage={icons_end} />}
                {itemType === ItemType.IF && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} name="IF" childImage={icons_if} />}
            </g>
        );
    }

}
