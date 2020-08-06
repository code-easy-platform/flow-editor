import React, { useCallback, useRef } from 'react';
import { useRecoilCallback } from 'recoil';

import { FlowItemStore, FlowItemsStore, GetFlowItemsSelector, GetSelectedFlowItemsSelector } from './shared/stores';
import { useFlowItems, useConfigs, useSelectItemById, useCopySelecteds, usePasteSelecteds } from './shared/hooks';
import { OnChangeEmitter } from './components/on-change-emitter/OnChangeEmitter';
import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EmptyFeedback } from './components/empty-feedback/EmptyFeedback';
import { SelectorArea } from './components/area-selector/SelectorArea';
import { EditorPanel } from './components/editor-panel/EditorPanel';
import { BreandCamps } from './components/breadcamps/BreandCamps';
import { FlowItem } from './components/flow-item/FlowItem';
import { Lines } from './components/flow-item/line/Lines';
import { ICoords, IFlowItem } from './shared/interfaces';
import { Toolbar } from './components/tool-bar/ToolBar';
import { DropTargetMonitor } from 'react-dnd';
import { Utils } from 'code-easy-components';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = (props) => {
    const {
        elevationColor, useElevation,
        selectionBorderWidth, backgroundColor, disableSelection,
        dottedSize, dotColor, typesAllowedToDrop, backgroundType,
        toolbarBackgroundColor, toolbarBorderColor, toolbarItemWidth,
        selectionBackgroundColor, selectionBorderColor, selectionBorderType,
        breadcrumbBackgroundColor, breadcrumbTextColor, breadcrumbBorderColor,
    } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit", breadcrumbs = [], toolItems = [], showToolbar = true } = props;
    const { onMouseEnter, onMouseLeave, onContextMenu, onChangeItems, onDropItem } = props;
    const pasteSelectedItems = usePasteSelecteds();
    const boardRef = useRef<SVGSVGElement>(null);
    const copySelectedItems = useCopySelecteds();
    const selectItemById = useSelectItemById();
    const items = useFlowItems();

    const selectItem = useCallback((item: IFlowItem, coords: ICoords) => {
        const top2 = item.top + (item.height || 0);
        const left2 = item.left + (item.width || 0);

        const yGreaterThan0 = ((coords.endY - coords.startY) > 0);
        const xGreaterThan0 = ((coords.endX - coords.startX) > 0);

        const lessThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
            return (
                (
                    (_param1 <= _coordStart) || (_param2 <= _coordStart)
                ) && (
                    (_param1 >= _coordEnd) || (_param2 >= _coordEnd)
                )
            );
        }

        const greaterThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
            return (
                (
                    (_param1 >= _coordStart) || (_param2 >= _coordStart)
                ) && (
                    (_param1 <= _coordEnd) || (_param2 <= _coordEnd)
                )
            );
        }

        return (
            (
                yGreaterThan0
                    ? greaterThan0Selected(item.top, top2, coords.startY, coords.endY)
                    : lessThan0Selected(item.top, top2, coords.startY, coords.endY)
            )
            &&
            (
                xGreaterThan0
                    ? greaterThan0Selected(item.left, left2, coords.startX, coords.endX)
                    : lessThan0Selected(item.left, left2, coords.startX, coords.endX)
            )
        );
    }, []);

    const setSelectedFlowItem = useRecoilCallback(({ set, snapshot }) => (coords: ICoords) => {
        items.forEach(async id => {
            const item = await snapshot.getPromise(FlowItemStore(id));
            const isSelected = selectItem(item, coords);
            if (item.isSelected !== isSelected) {
                set(FlowItemStore(id), { ...item, isSelected });
            }
        });
    });

    const handleSelecteAllFlowItems = useRecoilCallback(({ set }) => () => {
        items.forEach(id => {
            set(FlowItemStore(String(id)), oldState => ({
                ...oldState,
                isSelected: true
            }))
        });
    }, [items]);

    const handleDelte = useRecoilCallback(({ set, snapshot }) => async () => {
        let itemsCompleteSelecteds = await snapshot.getPromise(GetSelectedFlowItemsSelector);
        const itemsComplete = await snapshot.getPromise(GetFlowItemsSelector);

        // Remove all lines selecteds
        itemsCompleteSelecteds = itemsCompleteSelecteds.map(itemSelected => {
            const res = {
                ...itemSelected,
                connections: (itemSelected.connections || []).filter(connection => !connection.isSelected),
            };

            // Save in the state
            set(FlowItemStore(String(itemSelected.id)), res);

            return res;
        });

        // Remove all dependencies with the selecteds items
        itemsCompleteSelecteds.forEach(itemSelected => {
            itemsComplete.forEach(dependentItem => {

                // Remove old connections
                if ((dependentItem.connections || []).some(connection => (connection.targetId === itemSelected.id && itemSelected.isSelected))) {
                    dependentItem = {
                        ...dependentItem,
                        connections: [
                            ...(dependentItem.connections || []).filter(connection => connection.targetId !== itemSelected.id)
                        ]
                    };

                    // Save in the state
                    set(FlowItemStore(String(dependentItem.id)), dependentItem);
                }
            });
        });

        // Save a new list
        set(FlowItemsStore, itemsComplete.filter(item => !item.isSelected).map(item => {
            return String(item.id);
        }));
    });

    const handleArrowKeyDown = useRecoilCallback(({ set, snapshot }) => async (direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight") => {
        const items = await snapshot.getPromise(GetFlowItemsSelector);

        items.forEach(item => {
            if (item.isSelected) {
                switch (direction) {
                    case 'ArrowDown':
                        item = {
                            ...item,
                            top: item.top + 15
                        };
                        break;
                    case 'ArrowUp':
                        item = {
                            ...item,
                            top: item.top - 15
                        };
                        break;
                    case 'ArrowLeft':
                        item = {
                            ...item,
                            left: item.left - 15
                        };
                        break;
                    case 'ArrowRight':
                        item = {
                            ...item,
                            left: item.left + 15
                        };
                        break;
                }
                set(FlowItemStore(String(item.id)), item);
            }
        });
    });

    /** Essa função é executada sempre um item(aceito como item soltável) é sortado no painel */
    const handleDroptem = useRecoilCallback(({ snapshot, set }) => async (item: any, monitor: DropTargetMonitor) => {

        const target = boardRef.current;
        const draggedOffSet = monitor.getClientOffset();
        if (!target || !draggedOffSet) return;

        const targetSize = target.getBoundingClientRect();
        const targetOffsetY: number = (draggedOffSet.y + (targetSize.top - targetSize.top - targetSize.top) - 25);
        const targetOffsetX: number = (draggedOffSet.x + (targetSize.left - targetSize.left - targetSize.left) - 25);

        let newItem = {
            id: Utils.getUUID().toString(),
            flowItemType: item.itemProps.flowItemType,
            left: Math.round(targetOffsetX / 15) * 15,
            top: Math.round(targetOffsetY / 15) * 15,
            itemType: item.itemProps.itemType,
            height: item.itemProps.height,
            width: item.itemProps.width,
            label: item.itemProps.label,
            icon: item.itemProps.icon,
            isSelected: true,
        };

        // Get current items to deselect
        const itemsComplete = await snapshot.getPromise(GetFlowItemsSelector);

        /** Espera o retorno para inserir o item, se receber undefined só insere, se for diferente de undefined insere o resultado do event se existir algo */
        const onDropRes = onDropItem ? onDropItem(item.id, (newItem.id || Utils.getUUID()), newItem) : undefined;
        if (onDropRes === undefined) {

            // Add a new item in array state
            set(FlowItemsStore, [...items, newItem.id]);

            // Creates the state for the item
            set(FlowItemStore(newItem.id), newItem);

            itemsComplete.forEach(itemComplete => {
                if (itemComplete.id && itemComplete.isSelected) {
                    set(FlowItemStore(itemComplete.id), { ...itemComplete, isSelected: false })
                }
            });

        } else if (onDropRes) {

            // Add a new item in array state
            set(FlowItemsStore, [...items, (onDropRes.id || Utils.getUUID())]);

            // Creates the state for the item
            set(FlowItemStore(onDropRes.id || Utils.getUUID()), onDropRes);

            itemsComplete.forEach(itemComplete => {
                if (itemComplete.id && itemComplete.isSelected) {
                    set(FlowItemStore(itemComplete.id), { ...itemComplete, isSelected: false })
                }
            });
        }

        target.focus();

    }, [items, boardRef, onDropItem]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Toolbar
                itemsLogica={toolItems}
                itemWidth={toolbarItemWidth}
                borderColor={toolbarBorderColor}
                backgroundColor={toolbarBackgroundColor}
                isShow={((toolItems.length > 0) && showToolbar)}
            />
            <main key={id} style={{ flex: 1, overflow: 'auto' }}>
                <BreandCamps
                    backgroundColor={breadcrumbBackgroundColor}
                    borderColor={breadcrumbBorderColor}
                    textColor={breadcrumbTextColor}
                    elevationColor={elevationColor}
                    useElevation={useElevation}
                    breadcrumbs={breadcrumbs}
                />
                <EditorPanel
                    ref={boardRef}
                    id={`${id}_SVG`}
                    dotColor={dotColor}
                    dottedSize={dottedSize}
                    onDropItem={handleDroptem}
                    useElevation={useElevation}
                    onContextMenu={onContextMenu}
                    onKeyDownDelete={handleDelte}
                    elevationColor={elevationColor}
                    backgroundType={backgroundType}
                    backgroundColor={backgroundColor}
                    onKeyDownCtrlC={copySelectedItems}
                    onKeyDownCtrlV={pasteSelectedItems}
                    allowedsInDrop={typesAllowedToDrop}
                    onArrowKeyDown={handleArrowKeyDown}
                    onKeyDownCtrlA={handleSelecteAllFlowItems}
                    onMouseDown={e => selectItemById(undefined, e.ctrlKey)}
                    onKeyDownCtrlD={e => {
                        e.preventDefault();
                        copySelectedItems();
                        pasteSelectedItems();
                    }}
                >
                    <Lines />
                    {items.map(id => (
                        <FlowItem
                            id={id}
                            key={id}
                            onContextMenu={onContextMenu}
                        />
                    ))}
                    <SelectorArea
                        isDisabled={disableSelection}
                        borderType={selectionBorderType}
                        borderWidth={selectionBorderWidth}
                        borderColor={selectionBorderColor}
                        onCoordsChange={setSelectedFlowItem}
                        backgroundColor={selectionBackgroundColor}
                    />
                    <EmptyFeedback show={items.length === 0} children={childrenWhenItemsEmpty} />
                    <OnChangeEmitter onChange={onChangeItems} />
                </EditorPanel>
            </main>
        </div>
    );
}
