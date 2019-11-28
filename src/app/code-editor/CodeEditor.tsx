import React, { useState, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemToDrag } from './components/item-drag/ItemDrag';
import { ItemFluxo, ItemType } from './interfaces/ItemFluxo';
import { Line } from './components/lines/Line';
import { Utils } from '../shared/Utils';

const itens: ItemFluxo[] = [
    { id: 1, sucessorId: 2, nome: "item 1", top: 100, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 2, sucessorId: 3, nome: "item 2", top: 200, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 3, sucessorId: 4, nome: "item 3", top: 300, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 4, sucessorId: 5, nome: "item 4", top: 400, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 5, sucessorId: 6, nome: "item 5", top: 500, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 6, sucessorId: 7, nome: "item 6", top: 600, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 7, sucessorId: 8, nome: "item 7", top: 700, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 8, sucessorId: 0, nome: "item 8", top: 800, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
];

const itensLogica: ItemFluxo[] = [
    { id: 1, sucessorId: 2, nome: "START", top: 100, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 2, sucessorId: 3, nome: "IF", top: 200, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 3, sucessorId: 4, nome: "FOREACH", top: 300, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 4, sucessorId: 5, nome: "ACTION", top: 400, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 5, sucessorId: 6, nome: "SWICTH", top: 500, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 6, sucessorId: 7, nome: "ASSIGN", top: 600, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
    { id: 7, sucessorId: 8, nome: "END", top: 700, left: 20, width: 50, height: 50, itemType: ItemType.ASSIGN, },
];

export const CodeEditor = (props: any) => {

    const [flowItens, setFlowItens] = useState(itens);
    const svgRef = useRef(null);
    const [svgSize, setSvgSize] = useState({
        svgHeight: flowItens.sort((a, b) => b.top - a.top)[0].top + 200,
        svgWidth: flowItens.sort((a, b) => b.left - a.left)[0].left + 200,
    });
    const [, drop] = useDrop({
        accept: [ItemType.ASSIGN],
        drop(item: any, monitor: DropTargetMonitor) {

            const target: any = svgRef.current;
            const targetSize: any = target.getBoundingClientRect();
            const draggedOffSet: any = monitor.getClientOffset();
            const targetOffsetY: number = ((draggedOffSet.y) + (targetSize.top - targetSize.top - targetSize.top) - 25);
            const targetOffsetX: number = ((draggedOffSet.x) + (targetSize.left - targetSize.left - targetSize.left) - 25);

            flowItens.push({
                sucessorId: item.itemProps.sucessorId,
                itemType: ItemType.ASSIGN,
                nome: item.itemProps.nome,
                id: Utils.getRandomId(10000, 100000000),
                left: targetOffsetX,
                top: targetOffsetY,
                height: 50,
                width: 50,
            });

            setFlowItens(flowItens);
            setSvgSize({
                svgHeight: flowItens.sort((a, b) => b.top - a.top)[0].top + 200,
                svgWidth: flowItens.sort((a, b) => b.left - a.left)[0].left + 200,
            });
        },
    });

    // Agrupa as referencias do drop com as da ref.
    drop(svgRef);

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

    const onSucessorChange = (itemId: number, sucessorId: string) => {
        let localFlowItens = flowItens;
        let itemCurrent: ItemFluxo = localFlowItens[localFlowItens.findIndex((item: ItemFluxo) => { if (item.id === itemId) return item; else return undefined; })];

        // OBS: O update no fluxo é feito pela referencia entre variáveis js.
        itemCurrent.sucessorId = Number(sucessorId);

        setFlowItens(localFlowItens);
        setSvgSize({
            svgHeight: flowItens.sort((a, b) => b.top - a.top)[0].top + 200,
            svgWidth: flowItens.sort((a, b) => b.left - a.left)[0].left + 200,
        });
    }

    return (
        <div style={{ flex: 1, maxHeight: "100%" }}>
            <div className="mini-scroll-bar" style={{ padding: "10px", flexDirection: "column", overflow: "auto", alignItems: "center", width: 35, height: "100%", borderWidth: 0, borderRightWidth: 0.5, borderColor: "#949494bf", borderStyle: "solid" }}>
                {itensLogica.map((item) => {
                    return <ItemToDrag
                        id={item.id}
                        key={item.id}
                        title={item.nome}
                        allowDrag={true}
                        style={{}}
                    />;
                })}
            </div>
            <div style={{ flex: 1, overflow: "auto", }}>
                <svg ref={svgRef} style={{ height: svgSize.svgHeight, width: svgSize.svgWidth, minWidth: "100%" }}>

                    {flowItens.map((item: ItemFluxo) => {
                        let sucessorItem: any = flowItens.find((sucessorItem: ItemFluxo) => sucessorItem.id === item.sucessorId);
                        return <Line
                            id={item.id.toString()}
                            key={item.id}
                            color="gray"
                            top1={(item.top || 0) + (item.height || 0) - 15}
                            left1={(item.left || 0) + ((item.width || 0) / 2)}
                            left2={sucessorItem ? sucessorItem.left + sucessorItem.width / 2 : item.left + (item.width / 2)}
                            top2={sucessorItem ? sucessorItem.top - 25 : item.top + (item.height + 20)}
                            onSucessorChange={onSucessorChange}
                            refItemPai={svgRef}
                        />;
                    })}

                    {flowItens.map((item) => {
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
                            }}
                        />;
                    })}

                </svg>
            </div>
        </div>
    );
}
