import React, { useState, useRef } from 'react';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';

// import { Component, Tab, EMPTY_COMPONENT } from '../../../../../../shared/interfaces/Aplication';
// import { CodeEditorContext } from '../../../../../../shared/services/contexts/CodeEditorContext';
// import { ComponentType } from '../../../../../../shared/enuns/ComponentType';
// import { ItemToDrag } from './components/item-drag/ItemDrag';
// import FluxoComponentTypes from './enuns/FluxoList';

interface ItemFluxo {
    sucessorId: number,
    height: number,
    width: number,
    nome: string,
    left: number,
    top: number,
    id: number,
}

const itens: ItemFluxo[] = [
    { id: 1, sucessorId: 8, nome: "item 1", top: 100, left: 20, width: 50, height: 50 },
    { id: 2, sucessorId: 8, nome: "item 2", top: 200, left: 20, width: 50, height: 50 },
    { id: 3, sucessorId: 8, nome: "item 3", top: 300, left: 20, width: 50, height: 50 },
    { id: 4, sucessorId: 8, nome: "item 4", top: 400, left: 20, width: 50, height: 50 },
    { id: 5, sucessorId: 8, nome: "item 5", top: 500, left: 20, width: 50, height: 50 },
    { id: 6, sucessorId: 8, nome: "item 6", top: 600, left: 20, width: 50, height: 50 },
    { id: 7, sucessorId: 8, nome: "item 7", top: 700, left: 20, width: 50, height: 50 },
    { id: 8, sucessorId: 0, nome: "item 8", top: 800, left: 20, width: 50, height: 50 },
];

export const CodeEditor = () => {

    const [flowItens, setFlowItens] = useState(itens);
    const svgRef = useRef(null);
    const [svgSize, setSvgSize] = useState({
        svgHeight: flowItens.sort((a, b) => b.top - a.top)[0].top + 200,
        svgWidth: flowItens.sort((a, b) => b.left - a.left)[0].left + 200,
    });

    const positionChange = (itemId: number, positionTop: number, positionLeft: number) => {
        let component = flowItens[flowItens.findIndex((item: any) => { if (item.id === itemId) return item; return undefined; })];
        component.top = positionTop;
        component.left = positionLeft;
        setFlowItens(flowItens);
        setSvgSize({
            svgHeight: flowItens.sort((a, b) => b.top - a.top)[0].top + 200,
            svgWidth: flowItens.sort((a, b) => b.left - a.left)[0].left + 200,
        });
    }

    return (
        <div style={{ flex: 1, overflow: "auto", }}>
            <DndProvider backend={HTML5Backend}>
                <svg ref={svgRef} style={{ height: svgSize.svgHeight, width: svgSize.svgWidth, minWidth: "100%" }}>
                    {flowItens.map((item) => {

                        let sucessorItem: any = flowItens.find((sucessorItem: ItemFluxo) => sucessorItem.id === item.sucessorId);

                        return <ItemToDrag
                            id={item.id}
                            key={item.id}
                            title={item.nome}
                            refItemPai={svgRef}
                            outputPosition={positionChange}
                            style={{
                                top: item.top,
                                left: item.left,
                                width: item.width,
                                height: item.height,
                                lineTargetLeft: sucessorItem ? sucessorItem.left + sucessorItem.width / 2 : item.left + (item.width / 2),
                                lineTargetTop: sucessorItem ? sucessorItem.top - 25 : item.top + (item.height + 20),
                            }}
                        />;
                    })}
                </svg>
            </DndProvider>
        </div>
    );
}







    //#region Versão antiga

/* const codeEditorContext = useContext(CodeEditorContext);
const tabIndex: number = codeEditorContext.project.tabs.findIndex((tab: Tab) => { return tab.configs.isEditando === true ? tab : undefined });
let listItens: Component[] = [];

if (tabIndex >= 0) // Caso não exista uma tab selecionada.
    listItens = codeEditorContext.project.tabs[tabIndex].itens;

// Encontra o item que está sendo selecionado para ser editado!
const itemEditando: Component = listItens.find((item: Component) => {
    if (
        (
            item.configs.type === ComponentType.globalAction ||
            item.configs.type === ComponentType.localAction
        ) && item.configs.isEditando === true
    ) return item; else return undefined;
}) || EMPTY_COMPONENT;

// Verifica se estou esditando alguma coisa.
const isEditandoSomething = listItens.length > -1 && tabIndex >= 0;

let fluxoList: Component[] = listItens.filter((item: Component) => { return item.configs.type === ComponentType.flowItem && item.paiId === itemEditando.id });



const changeComponentState = (id: number, component: Component) => {
    if (isEditandoSomething)
        codeEditorContext.changeComponentState(id, component);
}

// Muda a posição do item de fluxo. Função passada por parâmetro para o itemDrag.
const positionChange = (position: any) => { // Position recebe: { itemId, top, left }
    const top = position.top;
    const left = position.left;

    let component: Component = fluxoList[fluxoList.findIndex((item: any) => { if (item.id === position.itemId) return item; return undefined; })];

    component.top = top;
    component.left = left;

    changeComponentState(position.itemId, component);
}

// Permite ser possível soltar im item no fluxo.
const [, drop] = useDrop({
    accept: [
        ComponentType.outputVariable,
        ComponentType.inputVariable,
        ComponentType.localVariable,
        ComponentType.globalAction,
        ComponentType.localAction,
        ComponentType.flowItem,
        ComponentType.rota,
        FluxoComponentTypes.flowItem,
    ],
    drop(item: any, monitor: DropTargetMonitor) {
        if (item.itemDetail.id) return;

        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round((item.itemDetail.left || 0) + delta.x - 150);
        const top = Math.round((item.itemDetail.top || 0) + delta.y - 40);

        const newComponent: Component = codeEditorContext.addComponent(itemEditando.id, item.itemDetail.title, ComponentType.flowItem, 80, 80, top, left);

        item.itemDetail.id = newComponent.id;
        item.itemDetail.title = item.title + newComponent.id;
    },
});

// Permite referenciar um item deste componente a partir de outro.
const ref = useRef<HTMLInputElement>(null);

// Agrupa as referencias do drop com as da ref.
drop(ref);

// Muda o sucessor do item que está sendo recebido por parâmetro.
const onSucessorChange = (itemId: number, sucessorId: string) => {
    let itemCurrent: Component = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === itemId) return item; else return undefined; })];
    let itemSucessor: Component = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === Number(sucessorId)) return item; else return undefined; })];

    // Propriedades do sucessor
    itemCurrent.sucessorId = Number(sucessorId);
    itemCurrent.isHaveSucessor = true;

    // Propriedades do antecessor
    itemSucessor.sucessorId = itemId;
    itemSucessor.isHaveAntecessor = true;

    // OBS: O update no fluxo é feito pela referencia entre variáveis js.

    changeComponentState(itemCurrent.id, itemCurrent);
    changeComponentState(itemSucessor.id, itemSucessor);
}

return (
    isEditandoSomething
        ? <div ref={ref} style={{ width: '100%' }}>
            <svg style={{ width: '100%' }}>

                {fluxoList.map((item: Component) => {
                    const { id, title, left, top, width, height, sucessorId  } = item;

                    let top2 = 0;
                    let left2 = 0;
                    let width2 = 0;
                    try {
                        let itemSucessor: Component = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === Number(sucessorId)) return item; else return undefined; })];

                        top2 = itemSucessor.top;
                        left2 = itemSucessor.left;
                        width2 = itemSucessor.width;

                    } catch (e) { }

                    return <ItemToDrag
                        id={id}
                        top={top}
                        left={left}
                        title={title}
                        width={width}
                        height={height}
                        refItemPai={ref}
                        lineTargetLeft={left2 + (width2 / 2)}
                        lineTargetTop={top2 - 5}
                        onSucessorChange={onSucessorChange}
                        outputPosition={positionChange}
                    >{title}</ItemToDrag>;
                })}

            </svg>
        </div>
        : <div></div>
) */
    //#endregion

