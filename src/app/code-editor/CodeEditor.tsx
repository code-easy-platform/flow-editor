import React, { useState, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemToDrag } from './components/item-drag/ItemDrag';
import { ItemFluxo, ItemType } from './interfaces/ItemFluxo';
import { Line } from './components/lines/Line';
import { Utils } from '../shared/Utils';
import { Toolbar } from './components/tool-bar/ToolBar';

/**
 * Propriedades aceitas pelo editor.
 */
export interface CodeEditorProps {
    toolItens: ItemFluxo[],
    itens: ItemFluxo[],
}

/** Define quais itens são aceitos no drop do start. */
const acceptedInDrop: ItemType[] = [ItemType.ASSIGN, ItemType.START, ItemType.END];

/**
 * Editor de fluxo.
 * 
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({ itens, toolItens }) => {

    /** Referencia o svg onde está todos os itens de fluxo. */
    const svgRef = useRef<any>(null);

    /** Controla o estado do editor inteiro. */
    const [state, setState] = useState({
        flowItens: itens,
        svgSize: { svgHeight: 0, svgWidth: 0 },
        selectionProps: {
            isMouseDown: false,
            runtimeStartLeft: 0,
            runtimeStartTop: 0,
            startLeft: 0,
            startTop: 0,
            endTop: 10,
            endLeft: 0
        }
    });

    /** Não precisou do setState por que está no fluxo de render. */
    state.svgSize = {
        svgHeight: (state.flowItens.length !== 0 ? (state.flowItens.sort((a, b) => b.top - a.top)[0].top + 200) : 0),
        svgWidth: (state.flowItens.length !== 0 ? (state.flowItens.sort((a, b) => b.left - a.left)[0].left + 200) : 0),
    };

    /** Usado para que seja possível o drop de itens no editor. */
    const [, dropRef] = useDrop({
        accept: acceptedInDrop,
        drop(item: any, monitor: DropTargetMonitor) {

            const target: any = svgRef.current;
            const targetSize: any = target.getBoundingClientRect();
            const draggedOffSet: any = monitor.getClientOffset();
            const targetOffsetY: number = ((draggedOffSet.y) + (targetSize.top - targetSize.top - targetSize.top) - 25);
            const targetOffsetX: number = ((draggedOffSet.x) + (targetSize.left - targetSize.left - targetSize.left) - 25);

            state.flowItens.push({
                id: Utils.getRandomId(10000, 100000000),
                sucessorId: item.itemProps.sucessorId,
                itemType: item.itemProps.itemType,
                nome: item.itemProps.title,
                isSelecionado: false,
                left: targetOffsetX,
                top: targetOffsetY,
                height: 50,
                width: 50,
            });

            setState({
                ...state,
                flowItens: state.flowItens,
            });
        },
    });

    /** Agrupa as referencias do drop com as da ref. */
    dropRef(svgRef);

    /** Depois que um elemento já está na tela, esta função muda a posição dele! */
    const positionChange = (itemId: number, positionTop: number, positionLeft: number) => {
        let component = state.flowItens[state.flowItens.findIndex((item: any) => { if (item.id === itemId) return item; return undefined; })];
        component.top = positionTop;
        component.left = positionLeft;

        state.svgSize.svgHeight = state.flowItens.sort((a, b) => b.top - a.top)[0].top + 200;
        state.svgSize.svgWidth = state.flowItens.sort((a, b) => b.left - a.left)[0].left + 200;

        setState({
            ...state,
            flowItens: state.flowItens,
            svgSize: state.svgSize
        });
    }

    /** 
     * Usado para mudar o "sucessorId" de um elemento.
     * Sucessor é usado para indicar onde o apontamento deve estar.
     */
    const onSucessorChange = (itemId: number, sucessorId: string) => {

        const itemCurrentIndex = state.flowItens.findIndex((item: ItemFluxo) => { if (item.id === Number(itemId)) return item; else return undefined; });
        let itemCurrent: ItemFluxo = state.flowItens[itemCurrentIndex];

        // Se tentar ligar um item nele mesmo deve ser perdida a ligação com qualquer elemento anterior.
        if (Number(itemId) === Number(sucessorId)) {
            sucessorId = "";
        }

        // OBS: O update no fluxo principal é feito pela referencia entre variáveis js.
        itemCurrent.sucessorId = Number(sucessorId);

        setState({
            ...state,
            flowItens: state.flowItens
        });
    }

    /** Identifica teclas que foram acionadas enquando o editor está focado. */
    const handleKeyPress = (event: any) => {
        if (event.key === 'Delete') onRemoveItem();

        if (event.key === 'ArrowUp') { moveComponenteByKey("ArrowUp"); event.preventDefault(); };
        if (event.key === 'ArrowDown') { moveComponenteByKey("ArrowDown"); event.preventDefault(); };
        if (event.key === 'ArrowLeft') { moveComponenteByKey("ArrowLeft"); event.preventDefault(); };
        if (event.key === 'ArrowRight') { moveComponenteByKey("ArrowRight"); event.preventDefault(); };
    }

    /** Move o componente pelas setas do teclado. */
    const moveComponenteByKey = (direction: string) => {
        let filteredList: ItemFluxo[] = state.flowItens.filter((item: ItemFluxo) => item.isSelecionado === true);
        if (filteredList.length === 0) return;

        if (direction === 'ArrowUp') {
            filteredList.forEach((item: ItemFluxo) => { item.top = item.top - 5; });
        } else if (direction === 'ArrowDown') {
            filteredList.forEach((item: ItemFluxo) => { item.top = item.top + 5; });
        } else if (direction === 'ArrowLeft') {
            filteredList.forEach((item: ItemFluxo) => { item.left = item.left - 5; });
        } else if (direction === 'ArrowRight') {
            filteredList.forEach((item: ItemFluxo) => { item.left = item.left + 5; });
        }

        setState({ ...state, flowItens: state.flowItens });
    }

    /** Remove o item que estiver selecionado no fluxo. */
    const onRemoveItem = () => {
        const itemCurrentIndex = state.flowItens.findIndex((item: ItemFluxo) => { if (item.isSelecionado === true) return item; else return undefined; });
        if (itemCurrentIndex === -1) return;

        const itemAntecessorIndex = state.flowItens.findIndex((item: ItemFluxo) => { if (item.sucessorId === state.flowItens[itemCurrentIndex].id) return item; else return undefined; });
        if (itemAntecessorIndex !== -1) { state.flowItens[itemAntecessorIndex].sucessorId = 0; }

        state.flowItens.splice(itemCurrentIndex, 1);

        setState({ ...state, flowItens: state.flowItens });

        onRemoveItem(); // Remove mais itens se estiverem selecionado.
    }

    /** Remove a selection da tela. */
    const removeSelection = () => {
        state.selectionProps = { isMouseDown: false, runtimeStartLeft: 0, runtimeStartTop: 0, startTop: 0, startLeft: 0, endTop: 0, endLeft: 0 };
        setState({ ...state, selectionProps: state.selectionProps });
        document.onmousemove = null;
        document.onmouseup = null;
    }

    const selecionaBySelection = (startTop: number, startLeft: number, endTop: number, endLeft: number) => {
        let filteredList: ItemFluxo[] = state.flowItens.filter((item: ItemFluxo) => {
            const top2 = item.top + item.height;
            const left2 = item.left + item.width;
            return (
                (
                    (
                        ((endTop - startTop) > 0)
                            ? ((item.top >= startTop) || (top2 >= startTop)) && ((item.top <= endTop) || (top2 <= endTop))
                            : ((item.top <= startTop) || (top2 <= startTop)) && ((item.top >= endTop) || (top2 >= endTop))
                    )
                    &&
                    (
                        ((endLeft - startLeft) > 0)
                            ? ((item.left >= startLeft) || (left2 >= startLeft)) && ((item.left <= endLeft) || (left2 <= endLeft))
                            : ((item.left <= startLeft) || (left2 <= startLeft)) && ((item.left >= endLeft) || (left2 >= endLeft))
                    )
                )
            );
        });

        state.flowItens.forEach((item: ItemFluxo) => { item.isSelecionado = false; });
        filteredList.forEach((item: ItemFluxo) => { item.isSelecionado = true; });
    }

    /** Ativa a seleção na tela. */
    const exibiSelection = (event: any) => {
        if (event.target.id !== svgRef.current.id) return;

        document.onmousemove = (event: any) => {
            if (state.selectionProps.isMouseDown) {
                state.selectionProps = {
                    ...state.selectionProps,
                    isMouseDown: true,
                    endTop: Number(event.offsetY),
                    endLeft: Number(event.offsetX),
                };

                state.selectionProps = {
                    ...state.selectionProps,
                    runtimeStartLeft: ((state.selectionProps.endLeft - state.selectionProps.startLeft) > 0) ? state.selectionProps.startLeft : state.selectionProps.endLeft,
                    runtimeStartTop: ((state.selectionProps.endTop - state.selectionProps.startTop) > 0) ? state.selectionProps.startTop : state.selectionProps.endTop,
                };

                selecionaBySelection(state.selectionProps.startTop, state.selectionProps.startLeft, state.selectionProps.endTop, state.selectionProps.endLeft);

                setState({ ...state, selectionProps: state.selectionProps });
            } else { removeSelection(); }
        }

        document.onmouseup = removeSelection;

        state.selectionProps = {
            ...state.selectionProps,
            isMouseDown: true,
            startTop: Number(event.nativeEvent.offsetY),
            startLeft: Number(event.nativeEvent.offsetX),
            endTop: Number(event.nativeEvent.offsetY),
            endLeft: Number(event.nativeEvent.offsetX),
        };

        state.selectionProps = {
            ...state.selectionProps,
            runtimeStartLeft: ((state.selectionProps.endLeft - state.selectionProps.startLeft) > 0) ? state.selectionProps.startLeft : state.selectionProps.endLeft,
            runtimeStartTop: ((state.selectionProps.endTop - state.selectionProps.startTop) > 0) ? state.selectionProps.startTop : state.selectionProps.endTop,
        };

        setState({
            ...state,
            selectionProps: state.selectionProps
        });
    }

    /** Desabilita qualquer item que esteja selecionado. */
    const onMouseDown = (event: any) => {
        exibiSelection(event);
        state.flowItens.forEach((item: ItemFluxo) => {
            item.isSelecionado = false;
        });
        setState({ ...state, flowItens: state.flowItens });
    }

    /** Muda item que está selecionado. */
    const onChangeSelecionado = (itemId: number) => {

        const itemCurrentIndex = state.flowItens.findIndex((item: ItemFluxo) => { if (item.id === Number(itemId)) return item; else return undefined; });

        state.flowItens[itemCurrentIndex].isSelecionado = true;

        setState({ ...state, flowItens: state.flowItens });
    }

    return (
        <div style={{ flex: 1, maxHeight: "100%" }}>
            {(toolItens.length > 0) && <Toolbar itensLogica={toolItens} />}

            <div key={"CODE_EDITOR"} style={{ flex: 1, overflow: "auto", }}>
                <svg tabIndex={0} id={"CODE_EDITOR_SVG"} ref={svgRef} onKeyDown={handleKeyPress} onMouseDown={onMouseDown} style={{
                    height: state.svgSize.svgHeight,
                    width: state.svgSize.svgWidth,
                    minHeight: "100%",
                    minWidth: "100%",
                    outline: "none"
                }}>
                    <rect
                        fill="#ffffff11"
                        stroke="#999fff"
                        strokeWidth={1}
                        onMouseUp={removeSelection}
                        y={state.selectionProps.runtimeStartTop}
                        x={state.selectionProps.runtimeStartLeft}
                        width={((state.selectionProps.endLeft - state.selectionProps.startLeft) > 0) ? (state.selectionProps.endLeft - state.selectionProps.startLeft) : (state.selectionProps.startLeft - state.selectionProps.endLeft)}
                        height={((state.selectionProps.endTop - state.selectionProps.startTop) > 0) ? (state.selectionProps.endTop - state.selectionProps.startTop) : (state.selectionProps.startTop - state.selectionProps.endTop)}
                    />

                    {state.flowItens.map((item: ItemFluxo) => {
                        const sucessorItem: any = state.flowItens.find((sucessorItem: ItemFluxo) => sucessorItem.id === item.sucessorId);
                        const left2 = sucessorItem ? sucessorItem.left + sucessorItem.width / 2 : item.left + (item.width / 2);
                        const top2 = sucessorItem ? sucessorItem.top - 25 : item.top + (item.height + 20);

                        if (item.itemType === ItemType.END) return null;

                        return <Line
                            left1={(item.left || 0) + ((item.width || 0) / 2)}
                            top1={(item.top || 0) + (item.height || 0) / 2}
                            onSucessorChange={onSucessorChange}
                            id={item.id.toString()}
                            refItemPai={svgRef}
                            key={item.id}
                            left2={left2}
                            color="gray"
                            top2={top2}
                        />;
                    })}

                    {state.flowItens.map((item: ItemFluxo) => {
                        return <ItemToDrag
                            onChangeSelecionado={onChangeSelecionado}
                            isSelecionado={item.isSelecionado}
                            outputPosition={positionChange}
                            itemType={item.itemType}
                            refItemPai={svgRef}
                            title={item.nome}
                            key={item.id}
                            id={item.id}
                            style={{
                                top: item.top,
                                left: item.left,
                                width: item.width,
                                height: item.height,
                            }}
                        />;
                    })}

                </svg>
            </div>
        </div>
    );
}
