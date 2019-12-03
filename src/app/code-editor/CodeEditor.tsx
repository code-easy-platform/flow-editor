import React, { useState, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemToDrag } from './components/item-drag/ItemDrag';
import { ItemFluxo, ItemType } from './interfaces/ItemFluxo';
import { Line } from './components/lines/Line';
import { Utils } from '../shared/Utils';
import { Toolbar } from './components/tool-bar/ToolBar';

const itens: ItemFluxo[] = [
    { id: 1, sucessorId: 2, nome: "item 1", top: 100, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 2, sucessorId: 3, nome: "item 2", top: 200, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 3, sucessorId: 4, nome: "item 3", top: 300, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 4, sucessorId: 5, nome: "item 4", top: 400, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 5, sucessorId: 6, nome: "item 5", top: 500, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 6, sucessorId: 7, nome: "item 6", top: 600, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 7, sucessorId: 8, nome: "item 7", top: 700, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 8, sucessorId: 0, nome: "item 8", top: 800, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
];

const itensLogica: ItemFluxo[] = [
    { id: 1, sucessorId: 2, nome: "START", top: 100, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 2, sucessorId: 3, nome: "IF", top: 200, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 3, sucessorId: 4, nome: "FOREACH", top: 300, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 4, sucessorId: 5, nome: "ACTION", top: 400, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 5, sucessorId: 6, nome: "SWICTH", top: 500, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 6, sucessorId: 7, nome: "ASSIGN", top: 600, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 7, sucessorId: 8, nome: "END", top: 700, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
];

const itensceitosNoDrop: ItemType[] = [ItemType.ASSIGN];

export const CodeEditor = (props: any) => {

    const svgRef = useRef(null);
    const [state, setState] = useState({
        flowItens: itens,
        svgSize: { svgHeight: 0, svgWidth: 0 }
    });

    // Não precisou do setState por que está no fluxo de render.
    state.svgSize = {
        svgHeight: (state.flowItens.length !== 0 ? (state.flowItens.sort((a, b) => b.top - a.top)[0].top + 200) : 0),
        svgWidth: (state.flowItens.length !== 0 ? (state.flowItens.sort((a, b) => b.left - a.left)[0].left + 200) : 0),
    };

    // Usado para que seja possível o drop de itens no editor.
    const [, dropRef] = useDrop({
        accept: itensceitosNoDrop,
        drop(item: any, monitor: DropTargetMonitor) {

            const target: any = svgRef.current;
            const targetSize: any = target.getBoundingClientRect();
            const draggedOffSet: any = monitor.getClientOffset();
            const targetOffsetY: number = ((draggedOffSet.y) + (targetSize.top - targetSize.top - targetSize.top) - 25);
            const targetOffsetX: number = ((draggedOffSet.x) + (targetSize.left - targetSize.left - targetSize.left) - 25);

            state.flowItens.push({
                id: Utils.getRandomId(10000, 100000000),
                sucessorId: item.itemProps.sucessorId,
                itemType: ItemType.ASSIGN,
                nome: item.itemProps.nome,
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

    // Agrupa as referencias do drop com as da ref.
    dropRef(svgRef);

    // Depois que um elemento já está na tela, esta função muda a posição dele!
    const positionChange = (itemId: number, positionTop: number, positionLeft: number) => {
        let component = state.flowItens[state.flowItens.findIndex((item: any) => { if (item.id === itemId) return item; return undefined; })];
        component.top = positionTop;
        component.left = positionLeft;

        state.svgSize.svgHeight = state.flowItens.sort((a, b) => b.top - a.top)[0].top + 200;
        state.svgSize.svgWidth = state.flowItens.sort((a, b) => b.left - a.left)[0].left + 200;

        setState({
            flowItens: state.flowItens,
            svgSize: state.svgSize
        });
    }

    // Usado para mudar o "sucessorId" de um elemento.
    // Sucessor é usado para indicar onde o apontamento deve estar.
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

    // Identifica teclas que foram acionadas enquando o editor está focado.
    const handleKeyPress = (event: any) => {
        if (event.key === 'Delete') onRemoveItem();

    }

    // Remove o item que estiver selecionado no fluxo.
    const onRemoveItem = () => {
        const itemCurrentIndex = state.flowItens.findIndex((item: ItemFluxo) => { if (item.isSelecionado === true) return item; else return undefined; });
        if (itemCurrentIndex === -1) return;

        const itemAntecessorIndex = state.flowItens.findIndex((item: ItemFluxo) => { if (item.sucessorId === state.flowItens[itemCurrentIndex].id) return item; else return undefined; });
        if (itemAntecessorIndex !== -1) { state.flowItens[itemAntecessorIndex].sucessorId = 0; }

        state.flowItens.splice(itemCurrentIndex, 1);

        setState({ ...state, flowItens: state.flowItens });
    }

    // Desabilita qualquer item que esteja selecionado.
    const onMouseDown = () => {
        state.flowItens.forEach((item: ItemFluxo) => {
            item.isSelecionado = false;
        });
        setState({
            ...state,
            flowItens: state.flowItens,
        });
    }

    // Muda item que está selecionado.
    const onChangeSelecionado = (itemId: number) => {
        const itemCurrentIndex = state.flowItens.findIndex((item: ItemFluxo) => { if (item.id === Number(itemId)) return item; else return undefined; });

        state.flowItens[itemCurrentIndex].isSelecionado = true;

        setState({ ...state, flowItens: state.flowItens });
    }

    return (
        <div style={{ flex: 1, maxHeight: "100%" }}>

            <Toolbar itensLogica={itensLogica} />

            <div style={{ flex: 1, overflow: "auto", }}>
                <svg tabIndex={0} ref={svgRef} onKeyPress={handleKeyPress} onMouseDown={onMouseDown} style={{
                    height: state.svgSize.svgHeight,
                    width: state.svgSize.svgWidth,
                    minHeight: "100%",
                    minWidth: "100%",
                    outline: "none"
                }}>

                    {state.flowItens.map((item: ItemFluxo) => {
                        const sucessorItem: any = state.flowItens.find((sucessorItem: ItemFluxo) => sucessorItem.id === item.sucessorId);
                        const left2 = sucessorItem ? sucessorItem.left + sucessorItem.width / 2 : item.left + (item.width / 2);
                        const top2 = sucessorItem ? sucessorItem.top - 25 : item.top + (item.height + 20);

                        return <Line
                            left1={(item.left || 0) + ((item.width || 0) / 2)}
                            top1={(item.top || 0) + (item.height || 0) - 15}
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

