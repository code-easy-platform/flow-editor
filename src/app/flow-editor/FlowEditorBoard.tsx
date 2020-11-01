import React, { useCallback, useRef } from 'react';
import { observe, set, useObserver } from "react-observing";
import { DropTargetMonitor } from 'react-dnd';
import { Utils } from 'code-easy-components';

import { ICoords, IFlowItem, IDroppableItem, IFlowEditorBoardProps } from './shared/interfaces';
import SelectorArea from './components/area-selector/SelectorArea';
import BreandCrumbs from './components/breadcrumbs/BreandCrumbs';
import EditorPanel from './components/editor-panel/EditorPanel';
import { useConfigs, useSelectItemById } from './shared/hooks';
import { EmptyFeedback, FlowItem } from './components';
import Toolbar from './components/tool-bar/ToolBar';
import { FlowItemsState } from './shared/stores';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = (props) => {
    const {
        elevationColor, breadcrumbBorderColor, disableSelection,
        dottedSize, dotColor, typesAllowedToDrop, backgroundType,
        selectionBorderWidth, backgroundColor, selectionBorderType,
        breadcrumbBackgroundColor, breadcrumbTextColor, showToolbar,
        toolbarBackgroundColor, toolbarBorderColor, toolbarItemWidth,
        selectionBackgroundColor, selectionBorderColor, useElevation,
    } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit", breadcrumbs = [], toolItems = [] } = props;
    const { onMouseEnter, onMouseLeave, onContextMenu, onDropItem, onFocus } = props;
    const { onAnyKeyDown, onKeyDownCtrlC, onKeyDownCtrlD, onKeyDownCtrlV } = props;

    const [items, setItems] = useObserver(FlowItemsState);
    const selectItemById = useSelectItemById();

    const boardRef = useRef<SVGSVGElement>(null);

    const selectItem = useCallback((item: IFlowItem, coords: ICoords): boolean => {
        const top2 = item.top.value + (item.height?.value || 0);
        const left2 = item.left.value + (item.width?.value || 0);

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
                    ? greaterThan0Selected(item.top.value, top2, coords.startY, coords.endY)
                    : lessThan0Selected(item.top.value, top2, coords.startY, coords.endY)
            )
            &&
            (
                xGreaterThan0
                    ? greaterThan0Selected(item.left.value, left2, coords.startX, coords.endX)
                    : lessThan0Selected(item.left.value, left2, coords.startX, coords.endX)
            )
        );
    }, []);

    const setSelectedFlowItem = useCallback((coords: ICoords) => {
        items.forEach(item => {
            const mustSelect = selectItem(item, coords);
            if (item.isSelected && !item.isSelected?.value !== mustSelect) {
                selectItemById(item.id.value, false);
            }
        });
    }, [items, selectItem, selectItemById]);

    const handleSelecteAllFlowItems = useCallback(() => {
        items.forEach(item => {
            if (item.isSelected && !item.isSelected?.value) {
                set(item.isSelected, true);
            }
        });
    }, [items]);

    const handleDelete = useCallback(() => {
        if (items.some(item => item.isSelected?.value)) {
            setItems(items.filter(item => !item.isSelected?.value));
        }
    }, [items, setItems]);

    const handleArrowKeyDown = useCallback((direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight") => {
        items.forEach(item => {
            if (item.isSelected?.value) {
                switch (direction) {
                    case 'ArrowDown':
                        set(item.top, item.top.value + 15);
                        break;
                    case 'ArrowUp':
                        set(item.top, item.top.value - 15);
                        break;
                    case 'ArrowLeft':
                        set(item.left, item.left.value - 15);
                        break;
                    case 'ArrowRight':
                        set(item.left, item.left.value + 15);
                        break;
                }
            }
        });
    }, [items]);

    /** Essa função é executada sempre um item(aceito como item soltável) é sortado no painel */
    const handleDroptem = useCallback((item: IDroppableItem, monitor: DropTargetMonitor, connectionTargetId?: string | undefined) => {

        const target = boardRef.current;
        const draggedOffSet = monitor.getClientOffset();
        if (!target || !draggedOffSet) return;

        // Deselect all items selecteds
        items.forEach(item => {
            if (item.isSelected && item.isSelected.value) {
                set(item.isSelected, false);
            }
        });

        const targetSize = target.getBoundingClientRect();
        const targetOffsetY = (draggedOffSet.y + (targetSize.top - targetSize.top - targetSize.top) - 25);
        const targetOffsetX = (draggedOffSet.x + (targetSize.left - targetSize.left - targetSize.left) - 25);

        let newItem: IFlowItem = {
            itemType: item.itemProps.itemType ? observe(item.itemProps.itemType) : undefined,
            flowItemType: observe(item.itemProps.flowItemType),
            left: observe(Math.round(targetOffsetX / 15) * 15),
            top: observe(Math.round(targetOffsetY / 15) * 15),
            label: observe(item.itemProps.label || ""),
            id: observe(Utils.getUUID().toString()),
            height: observe(item.itemProps.height),
            width: observe(item.itemProps.width),
            isEnabledNewConnetion: observe(true),
            icon: observe(item.itemProps.icon),
            hasWarning: observe(false),
            isDisabled: observe(false),
            isSelected: observe(true),
            description: observe(""),
            hasError: observe(false),
        };

        // Are your dropping in a line
        /* if (connectionTargetId) {
            const lineTarget = (await snapshot.getPromise(FlowLinesStore)).find(line => line.id === connectionTargetId);

            if (!lineTarget?.originId) return;

            // New connection to be used
            const newConnection = {
                id: Utils.getUUID(),
                originId: String(newItem.id),
                targetId: String(lineTarget.targetId),
            };

            // Update lines and added the new line
            set(FlowLinesStore, oldLines => {
                return [
                    newConnection,
                    ...oldLines.map(line => {
                        if (line.id !== lineTarget.id) return line;
                        return {
                            ...line,
                            targetId: String(newItem.id)
                        };
                    })
                ]
            });

            // Updates the source item that was previously linked to the new item as a destination
            set(FlowItemStore(lineTarget.originId), oldItemState => {
                return {
                    ...oldItemState,
                    connections: [
                        ...(oldItemState.connections || []).map(connection => {
                            if (connection.id !== lineTarget.id) return connection;
                            return {
                                ...connection,
                                targetId: String(newItem.id)
                            };
                        })
                    ]
                }
            });

            // Add first connection
            newItem = {
                ...newItem,
                connections: [
                    {
                        ...newConnection,
                        isSelected: false,
                    }
                ]
            };
        } */

        /** Wait for the return to insert the item, if you receive undefined just insert, if different from undefined insert the result of the event if there is something */
        const onDropRes = onDropItem ? onDropItem(item.itemProps.id, String(newItem.id), newItem) : undefined;
        if (!onDropRes) {

            // Add a new item in array state
            setItems(oldItems => ([...oldItems, newItem]));

        } else if (onDropRes) {

            // Add a new item in array state
            setItems(oldItems => ([...oldItems, onDropRes]));

        }

        target.focus();
    }, [items, onDropItem, setItems]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Toolbar
                items={toolItems}
                itemWidth={toolbarItemWidth}
                isShow={Boolean(showToolbar)}
                borderColor={toolbarBorderColor}
                backgroundColor={toolbarBackgroundColor}
            />
            <main key={id} style={{ flex: 1, overflow: 'auto' }}>
                <BreandCrumbs
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
                    onFocus={onFocus}
                    dotColor={dotColor}
                    dottedSize={dottedSize}
                    onDropItem={handleDroptem}
                    useElevation={useElevation}
                    onAnyKeyDown={onAnyKeyDown}
                    onContextMenu={onContextMenu}
                    onKeyDownDelete={handleDelete}
                    onKeyDownCtrlC={onKeyDownCtrlC}
                    onKeyDownCtrlD={onKeyDownCtrlD}
                    onKeyDownCtrlV={onKeyDownCtrlV}
                    elevationColor={elevationColor}
                    backgroundType={backgroundType}
                    backgroundColor={backgroundColor}
                    allowedsInDrop={typesAllowedToDrop}
                    onArrowKeyDown={handleArrowKeyDown}
                    onKeyDownCtrlA={handleSelecteAllFlowItems}
                    onMouseDown={e => selectItemById(undefined, e.ctrlKey)}
                >
                    {/* {lines.map(({ id, originId, targetId }, index) => <Line
                        id={id}
                        key={index}
                        originId={originId}
                        targetId={targetId}
                        parentRef={boardRef}
                        onDropItem={handleDroptem}
                        onContextMenu={onContextMenu}
                        allowedsInDrop={typesAllowedToDrop}
                    />)} */}
                    {items.map((item, index) => (
                        <FlowItem
                            item={item}
                            key={index}
                            parentRef={boardRef}
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
                </EditorPanel>
            </main>
        </div>
    );
}
