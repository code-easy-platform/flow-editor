import React, { memo, useCallback } from 'react'

import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EditorPanel } from '../code-editor/components/editor-panel/EditorPanel';
import { SelectorArea } from '../code-editor/components/selector/SelectorArea';
import { EmptyFeedback } from './components/empty-feedback/EmptyFeedback';
import { Utils as InternalUtils } from '../code-editor/shared/Utils';
import { ILine } from './shared/interfaces/FlowItemInterfaces';
import { FlowItem } from './components/flow-item/FlowItem';
import { useFlowItems } from './contexts/FlowItemsContext';
import { useConfigs } from './contexts/Configurations';
import { Line } from './components/flow-item/Line';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = memo((props) => {
    const { boardSize, items, removeSelection, selectAll, selectionAreaChange, removeSelectedItems } = useFlowItems();
    const { backgroundType, disableSelection, typesAllowedToDrop, dottedSize } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit" } = props;
    const { onMouseEnter, onMouseLeave } = props;

    const getLines = useCallback((): ILine[] => {
        const lines: ILine[] = [];

        items.forEach(item => {

            // Get all items that are connected by the current item
            const itemConnections = items.filter(sucessorItem => (sucessorItem.id !== undefined)
                ? item.connections?.some(connection => sucessorItem.id === connection.connectionId)
                : false
            );

            /** Se for undefined não cria as linhas */
            if (item.id === undefined) return;

            itemConnections.forEach(itemConnection => {
                /** Tem a posição do item de destino da seta */
                const left2 = itemConnection ? itemConnection.left + ((itemConnection.width || 0) / 2) : item.left + ((item.width || 0) / 2);
                const top2 = itemConnection ? itemConnection.top + ((itemConnection.height || 0) / 2) : item.top + ((item.height || 0) / 2);

                /** Valida se a linha deve estar curvada para facilitar a visualização */
                const isCurved = (itemConnection.connections || []).some(connection => connection.connectionId === item.id);

                /** Busca a connection que está criando esta linha */
                const connection = (item.connections || []).find(connection => connection.connectionId === itemConnection.id);

                lines.push({
                    radius: (item.width || 0) - ((item.width || 0) / 4),
                    description: connection?.connectionDescription,
                    left1: item.left + ((item.width || 0) / 2),
                    top1: item.top + ((item.height || 0) / 2),
                    isSelected: connection?.isSelected,
                    label: connection?.connectionLabel,
                    id: connection?.id,
                    lineType: "normal",
                    isDisabled: false,
                    isCurved,
                    left2,
                    top2,
                });
            });

            if (InternalUtils.useNewBranch(itemConnections.length, `${item.itemType}`)) {
                lines.push({
                    radius: (item.width || 0) - ((item.width || 0) / 4),
                    left1: item.left + ((item.width || 0) / 2),
                    top1: item.top + ((item.height || 0) / 2),
                    left2: item.left + ((item.width || 0) / 2),
                    top2: item.top + ((item.height || 0) / 2),
                    lineType: "normal",
                    isDisabled: false,
                    id: undefined,
                });
            };

        });

        return lines;
    }, [items]);

    return (
        <div className="full-height full-width" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <main key={id} className="overflow-auto flex1 full-height full-width">
                <EditorPanel
                    id={`${id}_SVG`}
                    width={boardSize.width}
                    dottedSize={dottedSize}
                    height={boardSize.height}
                    onKeyDownCtrlA={selectAll}
                    onMouseDown={removeSelection}
                    allowedsInDrop={typesAllowedToDrop}
                    onKeyDownDelete={removeSelectedItems}
                    backgroundType={backgroundType || "custom"}
                >
                    {getLines().map((line, index) => <Line key={index} {...line} />)}

                    {items.map(item => (
                        <FlowItem
                            {...item}
                            key={item.id}
                        />
                    ))}
                    <SelectorArea
                        isDisabled={disableSelection}
                        onCoordsChange={selectionAreaChange}
                    />
                    <EmptyFeedback show={items.length === 0} children={childrenWhenItemsEmpty} />
                </EditorPanel>
            </main>
        </div>
    );
});
